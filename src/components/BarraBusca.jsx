import React from "react";

const SearchIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

// 1. Recebemos o termoBusca e setTermoBusca que vêm do App.jsx
function BarraBusca({ termoBusca, setTermoBusca }) {

  const lidarComMudanca = (evento) => {
    const textoDigitado = evento.target.value;
    // 2. Usamos o setTermoBusca que vem de fora para avisar o App.jsx
    setTermoBusca(textoDigitado);
    console.log("A procurar por:", textoDigitado);
  }

  // 3. O teu return continua EXATAMENTE igual, apenas mudei o 'value' do input
  return(
    <div className="relative flex justify-center w-full">
      <div className="relative mb-4 w-full justify-center mx-10 max-w-md">
        <input
          type="text"
          placeholder="Procure por arroz, sabão, bebidas..."
          value={termoBusca} // O valor agora vem do App.jsx
          onChange={lidarComMudanca}
          className="flex justify-center w-full px-3 py-2 pr-12 rounded-[0.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black-100 focus:outline-none focus:border-none focus:ring-2 focus:ring-[#ea580c] "
        ></input>

        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800 p-1 hover:text-[#ea580c] transition-colors">
          <SearchIcon className="h-6 w-6 stroke-2" />
        </button>
      </div>
    </div>
  );
}

export default BarraBusca;