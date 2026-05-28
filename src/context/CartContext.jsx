import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [itens, setItens] = useState([]);

    function adicionarItem(produto) {
        setItens((prev) => {
            const existe = prev.find((i) => i.id === produto.id);
            if (existe) {
                return prev.map((i) =>
                    i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
                );
            }
            return [...prev, { ...produto, quantidade: 1 }];
        });
    }

    function removerItem(id) {
        setItens((prev) => prev.filter((i) => i.id !== id));
    }

    function alterarQuantidade(id, delta) {
        setItens((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, quantidade: i.quantidade + delta } : i))
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