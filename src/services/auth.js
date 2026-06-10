const API_URL = import.meta.env.VITE_API_URL || "https://webhighperformance-backend.onrender.com";


export async function loginUsuario(email, password) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "email ou senha inválidos");
    }

    localStorage.setItem("token", data.token);

    return data;
}

export async function cadastrarUsuario(name, email, password, number) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, number }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar. Tente novamente.");
    }

    // Se a API retornar um token, salva automaticamente (login automático)
    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}


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


export async function listarProdutos() {
    const response = await fetch(`${API_URL}/api/products/`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar produtos.");
    }

    return data;
}


export function logout() {
    localStorage.removeItem("token");
}


export function getToken() {
    return localStorage.getItem("token");
}


export function isAuthenticated() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    // Verifica se o token JWT não está expirado
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp && Date.now() / 1000 > payload.exp) {
            localStorage.removeItem("token");
            return false;
        }
    } catch {
        // Token malformado — remove
        localStorage.removeItem("token");
        return false;
    }
    return true;
}
