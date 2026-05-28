import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./services/auth.js";

// Componentes
import Header from "./components/Header.jsx";
import BarraBusca from "./components/BarraBusca.jsx";
import Card from "./components/ProductCard.jsx";

// Páginas
import Login from "./pages/admin/Login.jsx";
import Cadastro from "./pages/admin/Cadastro.jsx";

// ─── Rota protegida ────────────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

// ─── Rota pública ─────────────────────────────────────────────────────────────
function PublicRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// ─── Página Home ────────────────────────
function Home() {
  const [categorias, setCategorias] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true);

  // hooks!
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [produtoModal, setProdutoModal] = useState(null);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    const buscarDadosDoBanco = async () => {
      try {
        const resposta = await fetch('https://webhighperformance-backend.onrender.com/');
        const produtosDaAPI = await resposta.json();

        const categoriasAgrupadas = {};

        produtosDaAPI.forEach((produto) => {
          const nomeDaCategoria = produto.type;

          if (!categoriasAgrupadas[nomeDaCategoria]) {
            categoriasAgrupadas[nomeDaCategoria] = {
              nome: nomeDaCategoria,
              produtos: []
            };
          }
          categoriasAgrupadas[nomeDaCategoria].produtos.push(produto);
        });

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

  const todosOsProdutos = categorias.flatMap(categoria => categoria.produtos);
  const produtosFiltrados = termoBusca
    ? todosOsProdutos.filter(produto =>
        produto.name.toLowerCase().includes(termoBusca.toLowerCase()) ||
        produto.type.toLowerCase().includes(termoBusca.toLowerCase()) // Permite buscar por categoria também!
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 relative">
      <Header />
      <BarraBusca termoBusca={termoBusca} setTermoBusca={setTermoBusca} />

      <main className="px-5">
        {estaCarregando ? (
          <p className="text-center mt-10">Carregando...</p>
          ) : termoBusca ? (

          <div className="animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-black font-bold text-xl">
                Resultados para <span className="text-[#ea580c]">"{termoBusca}"</span>
              </h2>
            </div>

            {produtosFiltrados.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-10">
                {produtosFiltrados.map((produto) => (
                  <div
                    key={produto.id || produto._id}
                    className="cursor-pointer transform transition-transform hover:-translate-y-1"
                    onClick={() => setProdutoModal(produto)}
                  >
                    <Card imagem={null} titulo={produto.name} preco={produto.price} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-12">
                <p className="text-lg font-medium">Ops! Não encontramos nada.</p>
              </div>
            )}
          </div>

        ) : categoriaAtiva ? (

          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button
              onClick={() => setCategoriaAtiva(null)}
              className="flex items-center gap-2 text-gray-500 mb-6 hover:text-orange-600 font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
              Voltar para o Início
            </button>

            <h2 className="text-black font-bold text-2xl mb-6 px-2">
              {categoriaAtiva}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-10">
              {categorias
                .find(c => c.nome === categoriaAtiva)
                ?.produtos.map((produto) => (
                  <div
                    key={produto.id || produto._id}
                    className="cursor-pointer transform transition-transform hover:-translate-y-1"
                    onClick={() => setProdutoModal(produto)}
                  >
                    <Card imagem={null} titulo={produto.name} preco={produto.price} />
                  </div>
              ))}
            </div>
          </div>

        ) : (


          categorias?.map((categoria) => (
            <section key={categoria.nome} className="mb-8">

              <div className="flex items-center justify-between px-4 mb-4">
                <h2 className="text-black font-bold text-xl my-4">
                  {categoria.nome}
                </h2>

                {categoria?.produtos?.length > 5 && (
                  <button
                    onClick={() => setCategoriaAtiva(categoria.nome)}
                    className="text-[#ea580c] text-sm font-semibold hover:underline active:text-orange-800 transition-all"
                  >
                    Ver mais
                  </button>
                )}
              </div>

              <div className="flex overflow-x-auto gap-5 px-4 pb-6 hide-scrollbar snap-x snap-mandatory scroll-smooth">
                {categoria?.produtos?.slice(0, 5).map((produto) => (
                  <div
                    key={produto.id || produto._id}
                    className="min-w-[160px] max-w-[200px] snap-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                    onClick={() => setProdutoModal(produto)}
                  >
                    <Card imagem={null} titulo={produto.name} preco={produto.price} />
                  </div>
                ))}

                {categoria?.produtos?.length > 5 && (
                  <div className="min-w-[140px] snap-center flex p-1">
                    <button
                      onClick={() => setCategoriaAtiva(categoria.nome)}
                      className="w-full flex flex-col items-center justify-center gap-2 bg-orange-50 border-2 border-dashed border-orange-200 rounded-xl text-orange-600 hover:bg-orange-100 transition-colors"
                    >
                      <span className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-xl font-bold">+</span>
                      <span className="font-semibold text-sm">Ver todos</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          ))
        )}
      </main>

      {/* modal do produto.*/}
      {produtoModal && (
        <div
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setProdutoModal(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setProdutoModal(null)}
              className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-gray-500 hover:text-gray-800 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>


            <div className="h-48 w-full bg-gray-100 flex items-center justify-center p-4">
              <div className="text-gray-300 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM216,56V158.05l-45.66-45.65a16,16,0,0,0-22.62,0L96,164.05,62.28,130.34a16,16,0,0,0-22.62,0L24,146.05V56ZM24,168.69l27-27,45.65,45.66a16,16,0,0,0,22.63,0L171,135.66l45,45V200H24Z"></path></svg>
                <span className="text-sm mt-2">Sem imagem</span>
              </div>
            </div>

            {/* Informações */}
            <div className="p-6">
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                {produtoModal.type}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {produtoModal.name}
              </h3>

              {produtoModal.description && (
                <p className="text-sm text-gray-500 mb-6">
                  {produtoModal.description}
                </p>
              )}

              <div className="flex items-center justify-between mt-6">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase mb-1">Preço</p>
                  <p className="text-3xl font-black text-[#ea580c]">
                    <span className="text-lg">R$</span> {produtoModal.price}
                  </p>
                </div>

                <button
                  onClick={() => {
                    alert('Adicionado!');
                    setProdutoModal(null);
                  }}
                  className="bg-[#ea580c] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-orange-700 hover:-translate-y-1 transition-all"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Componente Principal (Diretor de Rotas) ───────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* rota principal é a home. */}

        {/* Rotas de Admin (Requer Login) */}
        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/cadastro"
          element={
            <PublicRoute>
              <Cadastro />
            </PublicRoute>
          }
        />

        {/* Redirecionamentos de Segurança */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;