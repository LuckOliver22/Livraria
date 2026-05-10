from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database import users_db, User

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(req: LoginRequest):
    user = next((u for u in users_db if u.username == req.username and u.password == req.password), None)
    if not user:
        raise HTTPException(status_code=401, detail="Usuário ou senha inválidos")
    return {"token": f"fake-jwt-{req.username}", "username": req.username}

@router.post("/register")
def register(req: RegisterRequest):
    exists = any(u.username == req.username for u in users_db)
    if exists:
        raise HTTPException(status_code=400, detail="Usuário já existe")
    users_db.append(User(username=req.username, password=req.password))
    return {"message": "Usuário criado com sucesso", "username": req.username}
