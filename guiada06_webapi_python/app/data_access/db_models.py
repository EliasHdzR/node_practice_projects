from sqlalchemy import Column, String, Integer
from app.data_access.db import Base

class UsuarioDbModel(Base):
    __tablename__ = 'usuarios'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(64))
    password = Column(String(512))
    nombre = Column(String(128))
    apellidos = Column(String(128))
    tipo_usuario = Column(Integer)