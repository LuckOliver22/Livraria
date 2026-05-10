const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Erro na requisição");
  }
  return res.json();
}

export const api = {
  // Auth
  login: (username, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  register: (username, password) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ username, password }) }),

  // Books
  getBooks: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/books/${qs ? "?" + qs : ""}`);
  },
  getBook: (id) => request(`/books/${id}`),
  getGenres: () => request("/books/genres/all"),

  // Orders
  createOrder: (user, items) =>
    request("/orders/", { method: "POST", body: JSON.stringify({ user, items }) }),
  getOrders: (user) => request(`/orders/?user=${user}`),
};
