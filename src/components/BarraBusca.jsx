import React from "react";
import { useState } from "react";

const SearchIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

function BarraBusca(){
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const lidarComMudanca = (evento) => {
    const textoDigitado = evento.target.value;
    setTermoPesquisa(textoDigitado);
    console.log("A procurar por:", textoDigitado);
  }
    return(

      <div className="relative justify-center mx-10">
        <input type="text" placeholder="Procure por arroz, sabão, bebidas..." value={termoPesquisa} onChange={lidarComMudanca} className="flex justify-center w-full px-3 py-2 pr-12 rounded-l-[0.5rem] rounded-r-[0.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black-100 focus:outline-none focus:border-none focus:ring-2 focus:ring-[#ea580c] "></input>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800 p-1 hover:text-[#ea580c] transition-colors">
          <SearchIcon className="h-6 w-6 stroke-2" />
        </button>
      </div>
    );
}

export default BarraBusca;

