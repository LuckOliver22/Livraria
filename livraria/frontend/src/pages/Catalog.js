import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useCart } from "../App";

export default function Catalog() {
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(null);

  useEffect(() => {
    api.getGenres().then(d => setGenres(d.genres));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (genre) params.genre = genre;
    api.getBooks(params).then(data => { setBooks(data); setLoading(false); });
  }, [search, genre]);

  const handleAdd = (book) => {
    addToCart(book);
    setAdded(book.id);
    setTimeout(() => setAdded(null), 1200);
  };

  return (
    <div>
      <div className="filters">
        <input
          placeholder="Buscar livros ou autores..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="">Todos os gêneros</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      {loading ? <p className="loading">Carregando...</p> : (
        <div className="book-grid">
          {books.map(book => (
            <div className="book-card" key={book.id}>
              <img
                src={book.cover_url || "https://via.placeholder.com/100x140?text=📚"}
                alt={book.title}
                onError={e => { e.target.src = "https://via.placeholder.com/100x140?text=📚"; }}
              />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <span className="genre-tag">{book.genre}</span>
                <div className="book-footer">
                  <span className="price">R$ {book.price.toFixed(2)}</span>
                  <span className="stock">{book.stock} em estoque</span>
                </div>
                <button
                  className={`add-btn ${added === book.id ? "added" : ""}`}
                  onClick={() => handleAdd(book)}
                  disabled={book.stock === 0}
                >
                  {added === book.id ? "✓ Adicionado!" : book.stock === 0 ? "Sem estoque" : "Adicionar ao carrinho"}
                </button>
              </div>
            </div>
          ))}
          {books.length === 0 && <p className="empty">Nenhum livro encontrado.</p>}
        </div>
      )}
    </div>
  );
}
