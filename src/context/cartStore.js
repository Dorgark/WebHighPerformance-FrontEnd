import { create } from 'zustand';

export const useCartStore = create((set, get) => ({

  itens: [],

  adicionarAoCarrinho: (produto) => set((state) => {
    const idProduto = produto._id || produto.id;
    const itemExistente = state.itens.find(item => (item._id || item.id) === idProduto);

    if (itemExistente) {
      return {
        itens: state.itens.map(item =>
          (item._id || item.id) === idProduto
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      };
    }

    return { itens: [...state.itens, { ...produto, quantidade: 1 }] };
  }),

  removerDoCarrinho: (produtoId) => set((state) => {
    const itemExistente = state.itens.find(item => (item._id || item.id) === produtoId);

    if (itemExistente && itemExistente.quantidade > 1) {
      return {
        itens: state.itens.map(item =>
          (item._id || item.id) === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
      };
    }

    return {
      itens: state.itens.filter(item => (item._id || item.id) !== produtoId)
    };
  }),

  limparCarrinho: () => set({ itens: [] }),

  obterTotalItens: () => {
    const { itens } = get();
    return itens.reduce((total, item) => total + item.quantidade, 0);
  },

  obterValorTotal: () => {
    const { itens } = get();
    return itens.reduce((total, item) => total + (item.price * item.quantidade), 0);
  }
}));