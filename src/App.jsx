import React from "react"
import Header from "./components/Header.jsx"
import BarraBusca from "./components/BarraBusca.jsx"


function App(){
    return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
    <Header />
    <BarraBusca />

    <main className="px-5">
        <p className="text-gray-400 text-center mt-10">A grid de produtos vem aqui...</p>
      </main>

    </div>
)
}

export default App;