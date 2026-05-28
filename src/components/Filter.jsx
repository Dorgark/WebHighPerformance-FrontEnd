import React, { useRef } from "react";

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
    </svg>
);

function Filtros({ categorias, categoriaAtiva, setCategoriaAtiva }) {
    const scrollRef = useRef(null);

    // "Tudo" = null (mostra tudo), qualquer outro = filtra pela categoria
    const handleClick = (nome) => {
        if (nome === "Tudo") {
            setCategoriaAtiva(null);
        } else {
            setCategoriaAtiva(nome);
        }
    };

    const isAtivo = (nome) => {
        if (nome === "Tudo") return categoriaAtiva === null;
        return categoriaAtiva === nome;
    };

    const todosOsFiltros = ["Tudo", ...categorias.map((c) => c.nome)];

    return (
        <div className="relative flex items-center px-4 mb-4">
            {/* Faixa com scroll horizontal sem scrollbar visível */}
            <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth"
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {todosOsFiltros.map((nome) => (
                    <button
                        key={nome}
                        onClick={() => handleClick(nome)}
                        className={`
              flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold
              border transition-all duration-200 whitespace-nowrap
              ${isAtivo(nome)
                                ? "bg-[#dc2626] text-white border-[#dc2626] shadow-md"
                                : "bg-white text-gray-600 border-gray-200 hover:border-[#dc2626] hover:text-[#dc2626]"
                            }
            `}
                    >
                        {nome}
                    </button>
                ))}
            </div>

            {/* Seta decorativa de "mais" no final — igual à imagem */}
            <button
                onClick={() => {
                    if (scrollRef.current) {
                        scrollRef.current.scrollBy({ left: 120, behavior: "smooth" });
                    }
                }}
                className="flex-shrink-0 ml-2 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm hover:border-[#dc2626] hover:text-[#dc2626] transition-colors"
            >
                <ChevronRight />
            </button>
        </div>
    );
}

export default Filtros;