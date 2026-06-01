import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

function getId(produto) {
    return produto._id || produto.id;
}

export function CartProvider({ children }) {
    const [itens, setItens] = useState([]);

    function adicionarItem(produto) {
        const produtoId = getId(produto);
        setItens((prev) => {
            const existe = prev.find((i) => getId(i) === produtoId);
            if (existe) {
                return prev.map((i) =>
                    getId(i) === produtoId ? { ...i, quantidade: i.quantidade + 1 } : i
                );
            }
            return [...prev, { ...produto, quantidade: 1 }];
        });
    }

    function removerItem(produtoId) {
        setItens((prev) => prev.filter((i) => getId(i) !== produtoId));
    }

    function alterarQuantidade(produtoId, delta) {
        setItens((prev) =>
            prev
                .map((i) => (getId(i) === produtoId ? { ...i, quantidade: i.quantidade + delta } : i))
                .filter((i) => i.quantidade > 0)
        );
    }

    const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);
    const totalPreco = itens.reduce(
        (acc, i) => acc + parseFloat(i.price) * i.quantidade,
        0
    );

    return (
        <CartContext.Provider
            value={{ itens, adicionarItem, removerItem, alterarQuantidade, totalItens, totalPreco }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}