import json
import openai
from globals import EMBEDDING_MODEL, KNN_TREE, COMPRESSED_DATABASE

AI_API_FUNCTIONS = [
    # {
    #     "name": "get_available_models",
    #     "description": "Get a list of all the available phone models",
    #     "parameters": {
    #         "type": "object",
    #         "properties": {},
    #         "required": []
    #     },
    # },
    {
        "name": "search",
        "description": "Find the k nearest PhoneSpecs in the database for each of the given PhoneSpecs.",
        "parameters": {
            "type": "object",
            "properties": {
                "phone_specs": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "color": {"type": ["string", "null"]},
                            "storage": {"type": ["number", "null"]},
                            "price": {"type": ["number", "null"]},
                            "used": {"type": ["boolean", "null"]},
                            "screen_size": {"type": ["number", "null"]},
                            "description": {"type": ["string", "null"]},
                        },
                        "required": ["name"]
                    },
                    "description": "An array of objects representing PhoneSpecs for each of which k neighbors will be found."
                },
                "k": {
                    "type": "integer",
                    "description": "The number of neighbors PhoneSpecs to return for each PhoneSpec.",
                    "default": 1
                },
                "display": {
                    "type": "boolean",
                    "description": "Whether to display the results to the user.",
                    "default": True
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


def search(phone_specs: str, k=1, display: bool = True):
    print("PhoneSpec", phone_specs)
    """Find PhoneSpecs database that share attributes with the given PhoneSpecs.

    Parameters
    ----------
    phone_specs : list[PhoneSpec]
        A list of JSON strings representing PhoneSpecs with the following schema:
        
        {
            id: int,
            name: string,
            color: string,
            storage: number | null,
            price: number | null,
            used: boolean,
            screen_size: number | null,
            description: string | null,
        }
    k : int, optional
        The number of neighboring PhoneSpecs to return, 1 <= k <= 3 (1 by default)
    display: bool, optional
        Whether to display the results to the user (False by default)

    Returns
    -------
    np.ndarray[int]
        An n x k array containing indices of the closest PhoneSpecs to the each input PhoneSpec.
    """
    print("k",k)
    phone_spec_embedding = openai.Embedding.create(input=[str(phone_spec) for phone_spec in phone_specs],
                                                   model=EMBEDDING_MODEL)
    distances, indices = KNN_TREE.query([embedding_obj["embedding"] for embedding_obj in phone_spec_embedding['data']],
                                        k=k)
    return distances, indices


# AI_API_AVAILABLE_FUNCTIONS = {"get_available_models": get_available_models, "search": search}
AI_API_AVAILABLE_FUNCTIONS = {"search": search}
