import React from "react";

export default function Card ({ imagem, titulo, preco}) {
     return(

        <div className="w-full h-full flex flex-col my-2 bg-white border border-[#4F6D7A] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gray-50 h-[60%] w-full flex items-center justify-center p-4">
                {imagem ? (
                    <img src={imagem} alt={titulo} className="max-h-full object-contain" />
                ) :(
                    <span className="text-slate-300 text-sm">Sem imagem</span>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow justify-around mt-2">
                <h2 className="line-clamp-2 font-semibold text-base text-[#4F6D7A] leading-tight mb-4">
                    {titulo}
                </h2>

                <div className="flex items-center justify-between mt-auto gap-1">
                    <span className="text-[#4F6D7A] font-bold text-lg">
                        R$ {preco}
                    </span>

                    <button className="bg-[#ea580c] text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors">
                        {"+"}
                    </button>
                </div>
        </div>
        </div>
    )
};
