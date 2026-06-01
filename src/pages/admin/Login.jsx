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
    const [mostrarSenha, setMostrarSenha] = useState(false);
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
            const data = await loginUsuario(email.trim(), senha);

            // Tenta obter o nome vindo da API, senão deduz do e-mail
            const parteNome = email.trim().split("@")[0];
            const nomeFormatado = parteNome.charAt(0).toUpperCase() + parteNome.slice(1);
            const nomeExibicao = data?.name || data?.user?.name || nomeFormatado;

            localStorage.setItem("userName", nomeExibicao);

            // Login bem-sucedido → vai para o dashboard administrativo
            navigate("/admin/dashboard");
        } catch (err) {
            setErro(err.message || "email ou senha inválidos");
        } finally {
            setCarregando(false);
        }
    }

    const inputClass =
        "w-full px-3.5 py-2.5 rounded-lg text-white text-sm outline-none border border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-200 disabled:opacity-60";
    const inputStyle = { background: "rgba(180,70,0,0.32)", boxSizing: "border-box" };

    // Ícones olho aberto / fechado
    const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
            <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.52,133.52,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,112Z" />
        </svg>
    );
    const EyeOffIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
            <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A111.11,111.11,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134.14,134.14,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z" />
        </svg>
    );

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
                {/* Botão Voltar */}
                <Link
                    to="/"
                    className="absolute top-4 left-4 flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-all duration-200 hover:-translate-x-0.5 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
                    </svg>
                    Voltar
                </Link>



                {/* Título */}
                <h1 className="text-white text-xl sm:text-2xl font-bold mb-8 text-center tracking-tight">
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
                    <div className="relative">
                        <input
                            id="login-senha"
                            type={mostrarSenha ? "text" : "password"}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoComplete="current-password"
                            disabled={carregando}
                            className={inputClass + " pr-10"}
                            style={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarSenha((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition-colors duration-150"
                            tabIndex={-1}
                            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {mostrarSenha ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
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