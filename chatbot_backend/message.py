from enum import Enum

class Role(Enum):
    USER = 'user'
    SYSTEM = 'system'
    ASSISTANT = 'assistant'
    
class Message(object):
    role: Role
    content: str
    phone_ids: list[str]
    
    def __init__(self, role: Role, content: str, phone_ids: list[str]):
        self.role = role
        self.content = content
        self.phone_ids = phone_ids