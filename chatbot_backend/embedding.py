import numpy as np
import openai
import json
import pickle
from globals import EMBEDDING_SIZE, EMBEDDING_MAX_TOKENS, EMBEDDING_TOKENIZER, EMBEDDING_MODEL
from sklearn.neighbors import KDTree
from sklearn.preprocessing import normalize


def create_embeddings(database: list[str]) -> tuple[KDTree, np.ndarray]:
    """Create KDTree for all the phone specs in the database.
    """
    # Allocate space for embeddings
    vector_database = np.empty((len(database), EMBEDDING_SIZE), dtype=float)

    # Track the number of tokens in the current slice
    last_slice = 0
    current_token_total = 0

    # Create embeddings for each phone spec
    for i, phone_spec in enumerate(database):
        current_token_count = len(EMBEDDING_TOKENIZER.encode_ordinary(phone_spec))
        current_token_total += current_token_count
        
        # If we've reached the maximum number of tokens, create an embedding for the current slice
        if current_token_total > EMBEDDING_MAX_TOKENS:
            phone_spec_embedding = openai.Embedding.create(input=database[last_slice:i], model=EMBEDDING_MODEL)
            vector_database[last_slice:i, :] = [embedding_obj["embedding"] for embedding_obj in phone_spec_embedding['data']]
            last_slice = i
            current_token_total = current_token_count

    # Create an embedding for the last slice
    phone_spec_embedding = openai.Embedding.create(input=database[last_slice:], model=EMBEDDING_MODEL)
    vector_database[last_slice:, :] = [embedding_obj["embedding"] for embedding_obj in phone_spec_embedding['data']]

    # Normalize the embeddings to unit length
    vector_database = normalize(vector_database, norm='l2', axis=1)
    
    # Build the KDTree
    knn_tree = KDTree(vector_database)
    return knn_tree, vector_database
         
def spec_from_idx(phone_id: int):
    return __DATABASE[phone_id]

if __name__ == '__main__':
    import os
    openai.api_key = ""

    __DATABASE = json.load(open("static/phones_compressed_data.json"))

    kdtree, vector_database = create_embeddings([str(e) for e in __DATABASE])
    
    # Save the KDTree and vector database
    import pickle
    pickle.dump(kdtree, open("kdtree.pkl", "wb"))
    np.save("vector_database.npy", vector_database)