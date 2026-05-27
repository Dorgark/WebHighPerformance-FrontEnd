import React from "react"
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx"
import BarraBusca from "./components/BarraBusca.jsx"
import Card from "./components/ProductCard.jsx";


function App(){
  const [categorias, setCategorias] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true);
   useEffect(() => {
    const buscarDadosDoBanco = async () => {
      try {
        // 1. Fazemos o GET público na tua API real
        // (Ajusta o http://localhost:5000 para a porta correta do teu backend)
        const resposta = await fetch('http://localhost:5000/api/products/');
        const produtosDaAPI = await resposta.json();

        // 2. A MÁGICA DA TRADUÇÃO: Agrupar a "lista reta" em "pastas de categorias"
        const categoriasAgrupadas = {};

        produtosDaAPI.forEach((produto) => {
          // O "type" do banco (ex: "Limpeza") será o nome da nossa categoria
          const nomeDaCategoria = produto.type;

          // Se a categoria ainda não existir na nossa lista, criamos a "pasta"
          if (!categoriasAgrupadas[nomeDaCategoria]) {
            categoriasAgrupadas[nomeDaCategoria] = {
              nome: nomeDaCategoria,
              produtos: []
            };
          }

          // Colocamos o produto dentro da "pasta" correta
          categoriasAgrupadas[nomeDaCategoria].produtos.push(produto);
        });

        // 3. Transformamos o objeto agrupado numa lista normal e guardamos na memória
        const listaFinal = Object.values(categoriasAgrupadas);
        setCategorias(listaFinal);

      } catch (erro) {
        console.error("Erro ao conectar com a API:", erro);
      } finally {
        setEstaCarregando(false);
      }
    };

    buscarDadosDoBanco();
  }, []);
  
    return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
    <Header />
    <BarraBusca />

    <main className="px-5">
      {estaCarregando ? (
      <p className="text-center mt-10">Carregando...</p>
    ) : (
      /* O map() vai percorrer cada categoria da nossa memória */
      categorias.map((categoria) => (
        <section key={categoria.nome} className="mb-8">

          <h2 className="text-[#4F6D7A] font-bold text-xl px-4 mb-4">
            {categoria.nome}
          </h2>

          <div className="flex overflow-x-auto gap-4 px-4 pb-4 hide-scrollbar snap-x">

            {categoria.produtos.map((produto) => (
              <div key={produto.id} className="min-w-[160px] snap-start">
                <Card
                  imagem={null}
                  titulo={produto.name}
                  preco={produto.price}
                />
              </div>
            ))}

            </div>
        </section>
      ))
    )}
      </main>

    </div>
)
}

export default App;