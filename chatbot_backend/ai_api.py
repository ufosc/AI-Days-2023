import json
import openai
from globals import EMBEDDING_MODEL, KNN_TREE, COMPRESSED_DATABASE

AI_API_FUNCTIONS = [ 
    {
        "name": "get_available_models",
        "description": "Get a list of all the available phone models",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": []
        },
    },
    {
        "name": "search",
        "description": "Find the closest phone spec in the database to the given phone spec.",
        "parameters": {
            "type": "object",
            "properties": {
                "phone_specs": {
                    "type": "string",
                    "description": """A JSON list of JSON objects representing PhoneSpecs with the following schema:
                          {
                              id: int, // the unique identifier of this phone
                              name: string, // the model of this phone
                              color: string,
                              battery: string | null, // a description of the phone's battery life
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
                              used: boolean, // whether this phone is new or used
                              screen_size: number | null, // diagonal screen size if available
                              description: string | null, // a paragraph form description of this phone
                          }
                    """
                },
                "k": {
                    "type": "integer",
                    "description": "The number of closest phone specs to return.",
                    "default": 3
                },
                "cutoff": {
                    "type": "number",
                    "description": "The minimum cosine distance to consider.",
                    "default": 0.5
                }
            },
            "required": ["phone_specs"]
        }
    }
]

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
    
    res = list(set(phone['name'] for phone in COMPRESSED_DATABASE))
    return res

def search(phone_specs: str, k=3):
    print("PhoneSpec", phone_specs)
    """Find PhoneSpecs database that share attributes with the given PhoneSpecs.

    Parameters
    ----------
    phone_specs : list[PhoneSpec | str]
        A list of JSON strings representing PhoneSpecs with the following schema:
        
        {
            id: int, // the unique identifier of this phone
            name: string, // the model of this phone
            color: string,
            battery: string | null, // a description of the phone's battery life
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
            used: boolean, // whether this phone is new or used
            screen_size: number | null, // diagonal screen size if available
            description: string | null, // a paragraph form description of this phone
        }
    k : int, optional
        The number of neighboring PhoneSpecs to return, 1 <= k <= 3 (3 by default)

    Returns
    -------
    list[tuple[int]]
        A list of k-tuples containing indices of the closest PhoneSpecs to the each PhoneSpec.
    """
    k = min(3, k)
    phone_spec_embedding = openai.Embedding.create(input=[str(phone_spec) for phone_spec in phone_specs], model=EMBEDDING_MODEL)
    distances, indices = KNN_TREE.query([embedding_obj["embedding"] for embedding_obj in phone_spec_embedding['data']], k=k)
    if k == 1:
        distances = distances[:, None]
        indices = indices[:, None]
    return indices

AI_API_AVAILABLE_FUNCTIONS = {"get_available_models": get_available_models, "search": search}