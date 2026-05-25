import React from "react";
import { useState } from "react";

function BarraBusca(){
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const lidarComMudanca = (evento) => {
    const textoDigitado = evento.target.value;
    setTermoPesquisa(textoDigitado);
    console.log("A procurar por:", textoDigitado);
  }
    return(

      <div className="flex justify-center mx-10">
        <input type="text" placeholder="Procure por arroz, sabão, bebidas..." value={termoPesquisa} onChange={lidarComMudanca} className="flex justify-center w-full px-3 py-2  rounded-l-[0.5rem] rounded-r-[0.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black-100 focus:outline-none focus:border-none focus:ring-2 focus:ring-[#ea580c] "></input>
      </div>
    );
}

export default BarraBusca;

