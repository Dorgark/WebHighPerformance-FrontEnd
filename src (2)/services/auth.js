// URL base da API — configure VITE_API_URL no .env (ex: http://localhost:3000)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Faz login e salva o token JWT no localStorage.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string }>}
 */
export async function loginUsuario(email, password) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        // A API retorna { error: "..." }
        throw new Error(data.error || "email ou senha inválidos");
    }

    // Persiste o token no localStorage
    localStorage.setItem("token", data.token);

    return data;
}

/**
 * Cadastra um novo usuário.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} number  — telefone/celular no padrão Brasil
 * @returns {Promise<{ resposta: string }>}
 */
export async function cadastrarUsuario(name, email, password, number) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, number }),
    });

    const data = await response.json();

    if (!response.ok) {
        // A API retorna { error: "..." } com as mensagens de validação
        throw new Error(data.error || "Erro ao cadastrar. Tente novamente.");
    }

    return data;
}

/**
 * Cria um novo produto (requer autenticação).
 * @param {{ name: string, price: number, description: string, type: string, amount: number }} produto
 * @returns {Promise<object>} — objeto do produto criado com _id
 */
export async function criarProduto(produto) {
    const token = getToken();

    const response = await fetch(`${API_URL}/api/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(produto),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro ao criar produto.");
    }

    return data;
}

/**
 * Lista todos os produtos (público, sem autenticação).
 * @returns {Promise<Array>}
 */
export async function listarProdutos() {
    const response = await fetch(`${API_URL}/api/products/`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar produtos.");
    }

    return data;
}

/**
 * Remove o token e desloga o usuário.
 */
export function logout() {
    localStorage.removeItem("token");
}

/**
 * Retorna o token JWT armazenado, ou null.
 */
export function getToken() {
    return localStorage.getItem("token");
}

/**
 * Retorna true se o usuário está autenticado (token presente).
 */
export function isAuthenticated() {
    return Boolean(localStorage.getItem("token"));
}
