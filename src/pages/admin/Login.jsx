import React, { useState } from "react";

export default function Login() {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        // TODO: integrar com autenticação
        console.log("Login:", login, "Senha:", senha);
    }

    return (
        <div style={styles.wrapper}>
            {/* Fundo com degradê laranja vibrante e camadas de brilho */}
            <div style={styles.bgLayer1} />
            <div style={styles.bgLayer2} />
            <div style={styles.bgLayer3} />

            {/* Card glassmorphism */}
            <form onSubmit={handleSubmit} style={styles.card}>
                {/* Campo Login */}
                <div style={styles.inputWrapper}>
                    <label style={styles.label}>Login:</label>
                    <input
                        id="login-email"
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        style={styles.input}
                        autoComplete="username"
                        placeholder=""
                    />
                </div>

                {/* Campo Senha */}
                <div style={styles.inputWrapper}>
                    <label style={styles.label}>Senha:</label>
                    <input
                        id="login-senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        style={styles.input}
                        autoComplete="current-password"
                        placeholder=""
                    />
                </div>

                {/* Botão Entrar */}
                <button id="login-submit" type="submit" style={styles.button}>
                    Entrar
                </button>

                {/* Link cadastro */}
                <p style={styles.registerText}>
                    Não tem uma conta?{" "}
                    <a href="/cadastro" style={styles.registerLink}>
                        Cadastre-se
                    </a>
                </p>
            </form>
        </div>
    );
}

const styles = {
    wrapper: {
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#e84800",
    },

    // Camada base do degradê
    bgLayer1: {
        position: "absolute",
        inset: 0,
        background:
            "radial-gradient(ellipse 80% 80% at 20% 30%, #ff8c00 0%, #e84800 45%, #c73200 100%)",
        zIndex: 0,
    },

    // Brilho superior esquerdo (reflexo claro)
    bgLayer2: {
        position: "absolute",
        inset: 0,
        background:
            "radial-gradient(ellipse 55% 60% at 15% 15%, rgba(255,200,80,0.55) 0%, transparent 65%)",
        zIndex: 1,
    },

    // Brilho inferior direito
    bgLayer3: {
        position: "absolute",
        inset: 0,
        background:
            "radial-gradient(ellipse 50% 50% at 85% 80%, rgba(255,120,0,0.45) 0%, transparent 65%)",
        zIndex: 1,
    },

    // Card translúcido
    card: {
        position: "relative",
        zIndex: 10,
        width: "min(340px, 88vw)",
        padding: "48px 36px 40px",
        borderRadius: "20px",
        background: "rgba(210, 90, 0, 0.38)",
        backdropFilter: "blur(14px) saturate(1.4)",
        WebkitBackdropFilter: "blur(14px) saturate(1.4)",
        border: "1px solid rgba(255,200,120,0.22)",
        boxShadow:
            "0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,220,140,0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "0",
    },

    inputWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        marginBottom: "18px",
    },

    label: {
        color: "rgba(255,255,255,0.9)",
        fontSize: "14px",
        fontWeight: "500",
        letterSpacing: "0.3px",
    },

    input: {
        width: "100%",
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1px solid rgba(255,200,120,0.3)",
        background: "rgba(180,70,0,0.32)",
        color: "#fff",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxSizing: "border-box",
    },

    button: {
        marginTop: "10px",
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        border: "none",
        background: "rgba(160, 55, 0, 0.75)",
        color: "#fff",
        fontSize: "15px",
        fontWeight: "600",
        letterSpacing: "0.4px",
        cursor: "pointer",
        transition: "background 0.2s, transform 0.1s",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
    },

    registerText: {
        marginTop: "18px",
        textAlign: "center",
        color: "rgba(255,255,255,0.85)",
        fontSize: "13px",
    },

    registerLink: {
        color: "#fff",
        fontWeight: "600",
        textDecoration: "underline",
        cursor: "pointer",
    },
};
