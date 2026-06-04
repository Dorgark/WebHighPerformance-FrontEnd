import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const toastStyle = {
    base: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#111827",
        color: "white",
        padding: "12px 16px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        fontSize: "14px",
        fontWeight: 500,
        maxWidth: "240px",
        animation: "toastSlideIn 0.25s ease forwards",
        transition: "opacity 0.3s ease, transform 0.3s ease",
    },
    check: {
        flexShrink: 0,
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: "#22c55e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        color: "#9ca3af",
        fontSize: "11px",
        lineHeight: 1.2,
    },
    name: {
        fontWeight: 600,
        lineHeight: 1.3,
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
    },
};

const keyframes = `
@keyframes toastSlideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
}
`;

export default function BotaoCarrinho() {
    const { totalItens, toasts } = useCart();
    const navigate = useNavigate();

    return (
        <>
            <style>{keyframes}</style>

            {/* Pilha de toasts */}
            <div style={{
                position: "fixed",
                bottom: "96px",
                right: "20px",
                zIndex: 50,
                display: "flex",
                flexDirection: "column-reverse",
                gap: "8px",
                alignItems: "flex-end",
            }}>
                {toasts.map((toast, index) => {
                    const isNewest = index === toasts.length - 1;
                    const distancia = toasts.length - 1 - index;
                    return (
                        <div
                            key={toast.key}
                            style={{
                                ...toastStyle.base,
                                opacity: isNewest ? 1 : Math.max(0.3, 0.6 - distancia * 0.15),
                                transform: `scale(${isNewest ? 1 : Math.max(0.88, 0.95 - distancia * 0.03)})`,
                            }}
                        >
                            <span style={toastStyle.check}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" viewBox="0 0 256 256">
                                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                                </svg>
                            </span>
                            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                                <span style={toastStyle.label}>Adicionado ao carrinho</span>
                                <span style={toastStyle.name}>{toast.nome}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Botão flutuante */}
            <button
                onClick={() => navigate("/carrinho")}
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "20px",
                    zIndex: 50,
                    backgroundColor: "#ea580c",
                    color: "white",
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                }}
                aria-label="Abrir carrinho"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" viewBox="0 0 256 256">
                    <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16H34.05l32.51,168.86A24,24,0,1,0,98.24,208H160a24,24,0,1,0,23.4-16H98.24a8,8,0,0,1-7.86-6.57L87,168h96.1a24,24,0,0,0,23.61-19.71l12.16-76.94A8,8,0,0,0,222.14,58.87Z" />
                </svg>

                {totalItens > 0 && (
                    <span style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        backgroundColor: "white",
                        color: "#ea580c",
                        fontSize: "11px",
                        fontWeight: 900,
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                        border: "1px solid #fed7aa",
                    }}>
                        {totalItens > 9 ? "9+" : totalItens}
                    </span>
                )}
            </button>
        </>
    );
}