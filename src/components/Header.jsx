import React from "react";

const UserIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={size} height={size} fill={color}>
    <rect width="256" height="256" fill="none"></rect>
    <circle cx="128" cy="96" r="64" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></circle>
    <path d="M31,216a112,112,0,0,1,194,0" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></path>
  </svg>
);

const SearchIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

function Header() {
  return (
    <header className="bg-[#D83D00] rounded-b-[1.5rem] px-5 pt-10 pb-2 shadow-md mb-16">

      {/* div dos textos e perfil */}
      <div className="flex justify-between items-start mb-1 gap-1">

        {/* textos */}
        <div>
          <h1 className="text-white text-[1.4rem] font-sans leading-tight"> {/* leading-tight é o espaçamento entre as linhas, colocamos 'tight' pra ser um espaço pequeno! */}
            Sem tempo a perder?<br />
            Peça agora, retire no balcão.
          </h1>

          {/* Badge "Aberto agora" */}
          <div className="flex items-center gap-2 mt-2"> {/* botãozinho */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-80"></span> {/* animação vibrando */}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF5E]"></span>
            </span>
            <span className="text-[#00FF5E] text-sm font-bold tracking-wide">Aberto agora</span> {/* tracking wide é o espaçamento entre as letras, tá wide pra ficar um pouquinho espaçado a mais. */}
          </div>
        </div>

        {/* Lado Direito: Botão de Perfil */}
        <button className="bg-white p-2.5 rounded-full shadow-sm hover:scale-105 border transition-transform flex-shrink-0">
          <UserIcon size={30} color="#000000"  />
        </button>
      </div>

      {/* BARRA DE BUSCA (Sobreposta) */}
      <div className="relative transform translate-y-6 z-10">
        <input
          type="text"
          placeholder="Procure por arroz, sabão, bebidas..."
          className="w-full bg-white text-gray-700 rounded-full py-4 pl-5 pr-14 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black-100 focus:outline-none focus:ring-1 focus:ring-[#ea580c] font-medium placeholder:text-gray-400"
        />
        {/* Lupa alinhada à DIREITA */}
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 p-1 hover:text-[#ea580c] transition-colors">
          <SearchIcon className="h-6 w-6 stroke-2" />
        </button>
      </div>

    </header>
  );
}

export default Header;