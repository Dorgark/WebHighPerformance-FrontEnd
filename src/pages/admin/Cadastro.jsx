import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cadastrarUsuario } from "../../services/auth.js";
import { OrangeBg } from "./Login.jsx";

// Valida e-mail
function emailValido(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Valida telefone brasileiro
function telefoneValido(value) {
    const limpo = value.replace(/[\s\-().]/g, "");
    return /^(\+?55)?([1-9]{2})(9\d{8}|\d{8})$/.test(limpo);
}

// Classes CSS reutilizáveis
const page = "relative min-h-screen flex items-center justify-center overflow-hidden bg-[#e84800] py-8";
const form = "relative z-10 w-[92vw] max-w-[340px] sm:w-[420px] sm:max-w-[420px] md:w-[460px] md:max-w-[460px] px-6 py-10 sm:px-10 sm:py-12 rounded-2xl flex flex-col gap-0 border border-white/20";
const title = "text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center tracking-tight";
const field = "flex flex-col gap-1.5 mb-5";
const label = "text-white/90 text-sm font-medium tracking-wide";
const input = "w-full px-3.5 py-2.5 rounded-lg text-white text-sm outline-none border border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-200 disabled:opacity-60 placeholder:text-white/40";
const btn = "mt-2 w-full py-3 rounded-xl text-white text-base font-semibold tracking-wide transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2";
const errMsg = "mb-4 px-3 py-2 rounded-lg bg-red-500/30 border border-red-400/40 text-white text-sm text-center";
const okMsg = "mb-4 px-3 py-2 rounded-lg bg-green-500/30 border border-green-400/40 text-white text-sm text-center";

// Estilos inline (cores com transparência)
const formStyle = { background: "rgba(210,90,0,0.38)", backdropFilter: "blur(14px) saturate(1.4)", WebkitBackdropFilter: "blur(14px) saturate(1.4)", boxShadow: "0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,220,140,0.2)" };
const inputStyle = { background: "rgba(180,70,0,0.32)", boxSizing: "border-box" };
const btnStyle = { background: "rgba(160,55,0,0.80)", boxShadow: "0 2px 12px rgba(0,0,0,0.25)" };

export default function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (!nome.trim()) return setErro("Nome não pode ser vazio.");
        if (!emailValido(email.trim())) return setErro("Formato de email inválido.");
        if (!telefoneValido(telefone.trim())) return setErro("Número de telefone não é válido.");
        if (senha.length < 6) return setErro("Senha tem que ter 6 ou mais caracteres.");
        if (senha !== confirmarSenha) return setErro("As senhas não coincidem.");

        setCarregando(true);
        try {
            await cadastrarUsuario(nome.trim(), email.trim(), senha, telefone.trim());
            setSucesso("Conta criada com sucesso! Redirecionando para o login...");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setErro(err.message || "Erro ao cadastrar. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className={page}>
            <OrangeBg />

            <form onSubmit={handleSubmit} className={form} style={formStyle}>
                <h1 className={title}>Criar Conta</h1>

                {erro && <div className={errMsg}>{erro}</div>}
                {sucesso && <div className={okMsg}>{sucesso}</div>}

                <div className={field}>
                    <label htmlFor="cadastro-nome" className={label}>Nome completo:</label>
                    <input id="cadastro-nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome completo" autoComplete="name" disabled={carregando} className={input} style={inputStyle} />
                </div>

                <div className={field}>
                    <label htmlFor="cadastro-email" className={label}>E-mail:</label>
                    <input id="cadastro-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@email.com" autoComplete="email" disabled={carregando} className={input} style={inputStyle} />
                </div>

                <div className={field}>
                    <label htmlFor="cadastro-telefone" className={label}>Telefone / Celular:</label>
                    <input id="cadastro-telefone" type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(11) 99999-9999" autoComplete="tel" disabled={carregando} className={input} style={inputStyle} />
                </div>

                <div className={field}>
                    <label htmlFor="cadastro-senha" className={label}>
                        Senha: <span className="text-white/50 text-xs font-normal">(mín. 6 caracteres)</span>
                    </label>
                    <input id="cadastro-senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="new-password" disabled={carregando} className={input} style={inputStyle} />
                </div>

                <div className={field}>
                    <label htmlFor="cadastro-confirmar" className={label}>Confirmar Senha:</label>
                    <input id="cadastro-confirmar" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} autoComplete="new-password" disabled={carregando} className={input} style={inputStyle} />
                </div>

                <button id="cadastro-submit" type="submit" disabled={carregando} className={btn} style={btnStyle}>
                    {carregando ? (
                        <>
                            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Cadastrando...
                        </>
                    ) : "Cadastrar"}
                </button>

                <p className="mt-5 text-center text-white/85 text-sm">
                    Já tem uma conta?{" "}
                    <Link to="/" className="text-white font-semibold underline hover:opacity-80 transition-opacity">
                        Entrar
                    </Link>
                </p>
            </form>
        </div>
    );
}
