import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.js";

const UserIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={size} height={size} fill={color}>
    <rect width="256" height="256" fill="none"></rect>
    <circle cx="128" cy="96" r="64" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></circle>
    <path d="M31,216a112,112,0,0,1,194,0" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></path>
  </svg>
);

function Header() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    function handleClickFora(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  function handleSair() {
    setMenuAberto(false);
    logout();
    navigate("/");
  }


  return (
    <header className="bg-[#D83D00] rounded-b-[1.5rem] px-5 pt-10 pb-2 shadow-md mb-6">

      {/* div dos textos e perfil */}
      <div className="flex justify-between items-start mb-1 gap-1">

        {/* textos */}
        <div>
          <h1 className="text-white text-[1.3rem] font-sans leading-tight"> {/* leading-tight é o espaçamento entre as linhas, colocamos 'tight' pra ser um espaço pequeno! */}
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

        {/* Lado Direito: Botão de Perfil + Dropdown */}
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            className="bg-white p-2.5 rounded-full shadow-sm hover:scale-105 border transition-transform"
            onClick={() => setMenuAberto((v) => !v)}
            aria-label="Menu do usuário"
            aria-expanded={menuAberto}
          >
            <UserIcon size={30} color="#000000" />
          </button>

          {/* Dropdown */}
          {menuAberto && (
            <div
              className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden shadow-xl border border-white/10 z-50"
              style={{
                background: "rgba(30,10,0,0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {/* Sair */}
              <button
                onClick={handleSair}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition-all duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Sair
              </button>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}



export default Header;