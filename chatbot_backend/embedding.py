import numpy as np
import openai
import json
import tiktoken 
from sklearn.neighbors import KDTree
from sklearn.preprocessing import normalize

# text-embedding-ada-002
MODEL = "text-embedding-ada-002"
EMBEDDING_SIZE = 1536
MAX_TOKENS = 8192
TOKENIZER = tiktoken.get_encoding("cl100k_base")

# Build the databases
__DATABASE = json.load(open("static/phones_all_data.json"))

def create_embeddings(database: list[str], model: str) -> (KDTree, np.ndarray):
    """Create KDTree for all the phone specs in the database.
    """
    # Allocate space for embeddings
    vector_database = np.empty((len(database), EMBEDDING_SIZE), dtype=float)

    # Track the number of tokens in the current slice
    last_slice = 0
    current_token_total = 0

    # Create embeddings for each phone spec
    for i, phone_spec in enumerate(database):
        current_token_count = len(TOKENIZER.encode_ordinary(phone_spec))
        current_token_total += current_token_count
        
        # If we've reached the maximum number of tokens, create an embedding for the current slice
        if current_token_total > MAX_TOKENS:
            phone_spec_embedding = openai.Embedding.create(input=database[last_slice:i], model=model)
            vector_database[last_slice:i, :] = [embedding_obj["embedding"] for embedding_obj in phone_spec_embedding['data']]
            last_slice = i
            current_token_total = current_token_count

    # Create an embedding for the last slice
    phone_spec_embedding = openai.Embedding.create(input=database[last_slice:], model=model)
    vector_database[last_slice:, :] = [embedding_obj["embedding"] for embedding_obj in phone_spec_embedding['data']]

    # Normalize the embeddings to unit length
    vector_database = normalize(vector_database, norm='l2', axis=1)
    
    # Build the KDTree
    knn_tree = KDTree(vector_database)
    return knn_tree, vector_database

def search(phone_spec: str, k=1, cutoff=0.5):
    """Find the closest phone spec in the database to the given phone spec.

    Parameters
    ----------
    phone_spec : str
        A JSON string representing a PhoneSpec with the following schema:
        
        {
            id: string,
            name: string,
            color: string,
            battery: string | null,
            camera: {
                general: string | null,
                video: string | null,
                modes: string | null,
                front: string | null,
                rear: string | null
            },
            storage: number | null,
            price: number | null,
            brand: string,
            used: boolean,
            screen_size: number | null,
            description: string | null,
        }
    k : int, optional
        The number of closest phone specs to return, by default 1
    cutoff : float, optional
        The minimum cosine distance to consider, by default 0.5

    Returns
    -------
    list[int]
        A list of indices of the closest phone specs to the given phone spec. 
    """
    phone_spec_vec = openai.Embedding.create(phone_spec)
    distances, indices = __KNN_TREE.query([phone_spec_vec,], k=k)
    return [i if d > cutoff else None for i, d in zip(indices, distances)]
         
def spec_from_idx(phone_id: int):
    return __DATABASE[phone_id]

if __name__ == '__main__':
    import os
    openai.api_key = ""

    __DATABASE = json.load(open("static/phones_compressed_data.json"))

    kdtree, vector_database = create_embeddings([str(e) for e in __DATABASE[:10]], MODEL)
    
    import pickle
    pickle.dump(kdtree, open("kdtree.pkl", "wb"))

    np.save("vector_database.npy", vector_database)