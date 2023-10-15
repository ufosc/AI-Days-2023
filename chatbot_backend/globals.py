import json
import pickle
import tiktoken

# Embedding Constants
EMBEDDING_MODEL = "text-embedding-ada-002"
EMBEDDING_SIZE = 1536
EMBEDDING_MAX_TOKENS = 8192
EMBEDDING_TOKENIZER = tiktoken.get_encoding("cl100k_base")

# Databases
COMPRESSED_DATABASE = json.load(open("cache/phones_compressed.json"))
EXPANDED_DATABASE = json.load(open("cache/phones_expanded.json"))
KNN_TREE = pickle.load(open("cache/kdtree.pkl", "rb"))


# GPT
GPT = "gpt-4"