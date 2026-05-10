from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.database import books_db, Book

router = APIRouter()

@router.get("/", response_model=List[Book])
def list_books(genre: Optional[str] = None, search: Optional[str] = None):
    result = books_db
    if genre:
        result = [b for b in result if b.genre.lower() == genre.lower()]
    if search:
        result = [b for b in result if search.lower() in b.title.lower() or search.lower() in b.author.lower()]
    return result

@router.get("/{book_id}", response_model=Book)
def get_book(book_id: int):
    book = next((b for b in books_db if b.id == book_id), None)
    if not book:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return book

@router.get("/genres/all")
def list_genres():
    genres = list(set(b.genre for b in books_db))
    return {"genres": genres}
