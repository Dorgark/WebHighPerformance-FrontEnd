import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario } from "../../services/auth.js";

// Componente reutilizável de fundo laranja
function OrangeBg() {
    return (
        <>
            <div className="absolute inset-0 z-0"
                style={{ background: "radial-gradient(ellipse 80% 80% at 20% 30%, #ff8c00 0%, #e84800 45%, #c73200 100%)" }}
            />
            <div className="absolute inset-0 z-[1]"
                style={{ background: "radial-gradient(ellipse 55% 60% at 15% 15%, rgba(255,200,80,0.55) 0%, transparent 65%)" }}
            />
            <div className="absolute inset-0 z-[1]"
                style={{ background: "radial-gradient(ellipse 50% 50% at 85% 80%, rgba(255,120,0,0.45) 0%, transparent 65%)" }}
            />
        </>
    );
}

export { OrangeBg };

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    // Validação básica de e-mail client-side
    function emailValido(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        if (!email.trim() || !senha.trim()) {
            setErro("Preencha e-mail e senha.");
            return;
        }

        if (!emailValido(email.trim())) {
            setErro("Formato de e-mail inválido.");
            return;
        }

        setCarregando(true);
        try {
            await loginUsuario(email.trim(), senha);
            // Login bem-sucedido → vai para a home
            navigate("/home");
        } catch (err) {
            setErro(err.message || "email ou senha inválidos");
        } finally {
            setCarregando(false);
        }
    }

    const inputClass =
        "w-full px-3.5 py-2.5 rounded-lg text-white text-sm outline-none border border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-200 disabled:opacity-60";
    const inputStyle = { background: "rgba(180,70,0,0.32)", boxSizing: "border-box" };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#e84800]">
            <OrangeBg />

            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-[92vw] max-w-[340px] sm:w-[420px] sm:max-w-[420px] md:w-[460px] md:max-w-[460px] px-6 py-10 sm:px-10 sm:py-12 rounded-2xl flex flex-col gap-0 border border-white/20"
                style={{
                    background: "rgba(210, 90, 0, 0.38)",
                    backdropFilter: "blur(14px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(14px) saturate(1.4)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,220,140,0.2)",
                }}
            >
                {/* Título — desktop only */}
                <h1 className="hidden sm:block text-white text-2xl font-bold mb-8 text-center tracking-tight">
                    Área Administrativa
                </h1>

                {/* Mensagem de erro */}
                {erro && (
                    <div className="mb-4 px-3 py-2 rounded-lg bg-red-500/30 border border-red-400/40 text-white text-sm text-center">
                        {erro}
                    </div>
                )}

                {/* Campo E-mail */}
                <div className="flex flex-col gap-1.5 mb-5">
                    <label htmlFor="login-email" className="text-white/90 text-sm font-medium tracking-wide">
                        E-mail:
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@email.com"
                        autoComplete="email"
                        disabled={carregando}
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>

                {/* Campo Senha */}
                <div className="flex flex-col gap-1.5 mb-5">
                    <label htmlFor="login-senha" className="text-white/90 text-sm font-medium tracking-wide">
                        Senha:
                    </label>
                    <input
                        id="login-senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        autoComplete="current-password"
                        disabled={carregando}
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>

                {/* Botão Entrar */}
                <button
                    id="login-submit"
                    type="submit"
                    disabled={carregando}
                    className="mt-2 w-full py-3 rounded-xl text-white text-base font-semibold tracking-wide transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                        background: "rgba(160, 55, 0, 0.80)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    }}
                >
                    {carregando ? (
                        <>
                            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Entrando...
                        </>
                    ) : "Entrar"}
                </button>

                {/* Link cadastro */}
                <p className="mt-5 text-center text-white/85 text-sm">
                    Não tem uma conta?{" "}
                    <Link to="/cadastro" className="text-white font-semibold underline cursor-pointer hover:opacity-80 transition-opacity">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </div>
    );
}
