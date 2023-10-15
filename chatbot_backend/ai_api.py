import json
import openai

# __KNN_TREE = ""
__DATABASE = json.load(open("static/phones_compressed.json"))

def get_available_models():
    """Get a list of all the available phone models.

    Parameters
    ----------
    phone_spec : str

    Returns
    -------
    list[str]
        A list of strings of the available phone models. 
    """
    
    res = list(set(phone['name'] for phone in __DATABASE))
    return res

def search(phone_spec: str, k=3, cutoff=0.5):
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
        The number of closest phone specs to return, by default 3
    cutoff : float, optional
        The minimum distance to consider, by default 0.5

    Returns
    -------
    list[int]
        A list of indices of the closest phone specs to the given phone spec. 
    """
    phone_spec_embedding = openai.Embedding.create(input=str(phone_spec), model=MODEL)
    distances, indices = __KNN_TREE.query([embedding_obj["embedding"] for embedding_obj in phone_spec_embedding['data']], k=k)
    return [i if d > cutoff else None for i, d in zip(indices, distances)]