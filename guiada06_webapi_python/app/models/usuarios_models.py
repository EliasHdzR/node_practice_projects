from pydantic import BaseModel

class Usuario(BaseModel):
    id: int
    username: str
    name: str
    last_name: str | None

class GetAllUsersResponse(BaseModel):
    usuarios: list[Usuario]

class CreateUserRequest(BaseModel):
    username: str
    password: str
    name: str
    last_name: str

class CreateUserResponse(BaseModel):
    usuario_creado: Usuario