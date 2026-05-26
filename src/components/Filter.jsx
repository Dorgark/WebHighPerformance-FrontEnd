function Filtros({ categoriaAtiva, setCategoriaAtiva }) {
    const categorias = [
        "Tudo",
        "Alimentação",
        "Limpeza",
        "Bebidas",
        "Higiene",
    ];

    const estilos = {
        filtros: {
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            padding: "12px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
        },
        filtro: {
            padding: "8px 16px",
            border: "2px solid #ccc",
            borderRadius: "20px",
            backgroundColor: "white",
            color: "#555",
            cursor: "pointer",
            fontWeight: "500",
            transition: "all 0.2s",
        },
        ativo: {
            padding: "8px 16px",
            border: "2px solid #4CAF50",
            borderRadius: "20px",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            fontWeight: "500",
            transition: "all 0.2s",
        },
    };

    return (
        <div style={estilos.filtros}>
            {categorias.map((categoria) => (
                <button
                    key={categoria}
                    style={
                        categoriaAtiva === categoria
                            ? estilos.ativo
                            : estilos.filtro
                    }
                    onClick={() => setCategoriaAtiva(categoria)}
                >
                    {categoria}
                </button>
            ))}
        </div>
    );
}

export default Filtros;