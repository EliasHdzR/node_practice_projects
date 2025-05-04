from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.usuarios_models import Usuario, GetAllUsersResponse, CreateUserRequest, CreateUserResponse
from app.data_access.db import get_db
from app.data_access.db_models import UsuarioDbModel

router = APIRouter()

@router.get("/")
async def get_all_users(db: Session = Depends(get_db)) -> GetAllUsersResponse:
    usuarios_db = db.query(UsuarioDbModel).all()

    # este es un list comprehension, es una forma de iterar sobre una lista y aplicar una transformación a cada elemento
    usuarios = [Usuario(id=i.id, username=i.username, name=i.nombre, last_name=i.apellidos) for i in usuarios_db]

    res_obj = GetAllUsersResponse(usuarios=usuarios)
    return res_obj

@router.post("/")
async def create_user(usuario: CreateUserRequest) -> CreateUserResponse:
    res_obj = CreateUserResponse(usuario_creado=None)
    return res_obj

@router.get("/{user_id}")   
async def get_user(user_id: int):
    return {
        "user": {
            "id": user_id,
            "username": f"user{user_id}"
        }
    }