import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function getId(item) {
    return item._id || item.id;
}

export default function CartDrawer() {
    const navigate = useNavigate();
    const { itens, removerItem, alterarQuantidade, totalPreco } = useCart();

    const whatsappNumero = "5581999999999";

    function finalizarPedido() {
        if (itens.length === 0) return;
        const linhas = itens.map(
            (i) => `• ${i.name} x${i.quantidade} — R$ ${(parseFloat(i.price) * i.quantidade).toFixed(2)}`
        );
        const texto = `Olá! Gostaria de fazer o seguinte pedido:\n\n${linhas.join("\n")}\n\n*Total: R$ ${totalPreco.toFixed(2)}*`;
        const url = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank");
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <div className="flex items-center gap-4 px-5 pt-14 pb-5 bg-white shadow-sm">
                <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-orange-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800">Seu carrinho</h1>
            </div>

            <main className="flex-1 overflow-y-auto px-4 py-4 pb-40">
                {itens.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-24 gap-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16H34.05l32.51,168.86A24,24,0,1,0,98.24,208H160a24,24,0,1,0,23.4-16H98.24a8,8,0,0,1-7.86-6.57L87,168h96.1a24,24,0,0,0,23.61-19.71l12.16-76.94A8,8,0,0,0,222.14,58.87Z" />
                        </svg>
                        <p className="text-lg font-semibold">Seu carrinho está vazio</p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#ea580c] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all"
                        >
                            Ver produtos
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {itens.map((item) => {
                            const itemId = getId(item);
                            return (
                                <div key={itemId} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center">
                                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-xl" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#d1d5db" viewBox="0 0 256 256">
                                                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM216,56V158.05l-45.66-45.65a16,16,0,0,0-22.62,0L96,164.05,62.28,130.34a16,16,0,0,0-22.62,0L24,146.05V56ZM24,168.69l27-27,45.65,45.66a16,16,0,0,0,22.63,0L171,135.66l45,45V200H24Z" />
                                            </svg>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 pr-2">{item.name}</p>
                                            <button onClick={() => removerItem(itemId)} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                                                    <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                                                <button onClick={() => alterarQuantidade(itemId, -1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold transition-colors">−</button>
                                                <span className="text-sm font-bold text-gray-800 w-4 text-center">{item.quantidade}</span>
                                                <button onClick={() => alterarQuantidade(itemId, 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold transition-colors">+</button>
                                            </div>
                                            <span className="text-[#ea580c] font-bold text-base">
                                                R$ {(parseFloat(item.price) * item.quantidade).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {itens.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-[#D83D00] px-5 pt-4 pb-8 shadow-2xl">
                    <p className="text-white text-center font-bold text-lg mb-3">
                        Total: R$ {totalPreco.toFixed(2)}
                    </p>
                    <button
                        onClick={finalizarPedido}
                        className="w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-base hover:brightness-110 active:scale-95 transition-all shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Finalizar pedido!
                    </button>
                </div>
            )}
        </div>
    );
}