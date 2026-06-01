import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function BotaoCarrinho() {
    const { totalItens } = useCart();
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/carrinho")}
            className="fixed bottom-6 right-5 z-50 bg-[#ea580c] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-700 active:scale-90 transition-all"
            aria-label="Abrir carrinho"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" viewBox="0 0 256 256">
                <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16H34.05l32.51,168.86A24,24,0,1,0,98.24,208H160a24,24,0,1,0,23.4-16H98.24a8,8,0,0,1-7.86-6.57L87,168h96.1a24,24,0,0,0,23.61-19.71l12.16-76.94A8,8,0,0,0,222.14,58.87Z" />
            </svg>

            {totalItens > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#ea580c] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow border border-orange-100">
                    {totalItens > 9 ? "9+" : totalItens}
                </span>
            )}
        </button>
    );
}