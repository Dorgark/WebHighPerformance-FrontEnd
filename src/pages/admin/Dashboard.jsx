import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getToken, logout } from "../../services/auth.js";

// ─── URL DA API ───────────────────────────────────────────────────────────────
const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://webhighperformance-backend.onrender.com";

// ─── ÍCONES ───────────────────────────────────────────────────────────────────
const IcPacote = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
        <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z" />
    </svg>
);
const IcHome = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
        <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77Z" />
    </svg>
);
const IcSair = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
        <path d="M120,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h64a8,8,0,0,1,0,16H48V208h64A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
    </svg>
);
const IcMais = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
        <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" />
    </svg>
);
const IcEditar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256">
        <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
    </svg>
);
const IcLixo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256">
        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z" />
    </svg>
);
const IcFechar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
    </svg>
);
const IcImagem = ({ size = 32 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216V158.75l-32.4-32.4a16,16,0,0,0-22.62,0L120,177.37l-26.35-26.35a16,16,0,0,0-22.63,0L24,198.11V56ZM40,200V220.11l50-50L120,200.1l41-41,55,55V200Z" />
    </svg>
);
const IcCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
    </svg>
);
const IcAviso = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
        <path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z" />
    </svg>
);
const IcBusca = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);
const IcMenu = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
        <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
    </svg>
);

// ─── CATEGORIAS ───────────────────────────────────────────────────────────────
const CATEGORIAS = ["Limpeza", "Higiene", "Descartáveis", "Construção", "Outros"];

// ═════════════════════════════════════════════════════════════════════════════
// TOAST
// ═════════════════════════════════════════════════════════════════════════════
function useToasts() {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback((message, type = "success") => {
        const id = Date.now() + Math.random();
        setToasts((p) => [...p, { id, message, type }]);
        setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3800);
    }, []);
    const removeToast = (id) => setToasts((p) => p.filter((t) => t.id !== id));
    return { toasts, addToast, removeToast };
}

function ToastContainer({ toasts, onRemove }) {
    if (!toasts.length) return null;
    return (
        <div className="fixed bottom-4 md:bottom-6 right-2 md:right-4 z-[300] flex flex-col gap-2 pointer-events-none max-w-[calc(100vw-16px)]">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    onClick={() => onRemove(t.id)}
                    className={`
            pointer-events-auto flex items-center gap-2.5 pl-3 pr-4 py-3
            rounded-2xl shadow-xl text-white text-sm font-semibold cursor-pointer
            select-none animate-in slide-in-from-right-4 fade-in duration-300
            ${t.type === "success" ? "bg-[#D83D00]" : ""}
            ${t.type === "error" ? "bg-red-600" : ""}
            ${t.type === "warning" ? "bg-amber-500" : ""}
          `}
                >
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                        {t.type === "success" ? <IcCheck /> : <IcAviso />}
                    </span>
                    <span className="break-words">{t.message}</span>
                </div>
            ))}
        </div>
    );
}

// SIDEBAR
const NAV = [
    { id: "produtos", label: "Produtos", icon: <IcPacote /> },
];


function Sidebar({ ativa, onNavegar, onSair, mobileAberta, onFecharMobile }) {
    const content = (
        <>
            <div className="px-5 pt-10 pb-7 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-black text-base leading-none">F</span>
                    </div>
                    <div>
                        <p className="text-white font-black text-base tracking-tight leading-none">FilaZero</p>
                        <p className="text-white/55 text-xs mt-0.5 font-medium">Painel Admin</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 px-3 pt-5 flex flex-col gap-1">
                {NAV.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => { onNavegar(item.id); onFecharMobile?.(); }}
                        className={`
              w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl
              text-sm font-semibold text-left transition-all duration-150
              ${ativa === item.id
                                ? "bg-white text-[#D83D00] shadow"
                                : "text-white/75 hover:bg-white/15 hover:text-white"}
            `}
                    >
                        <span className={ativa === item.id ? "text-[#D83D00]" : "text-white/60"}>
                            {item.icon}
                        </span>
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className="px-3 pb-8">
                <button
                    onClick={() => { onSair(); onFecharMobile?.(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-white/65 hover:bg-white/15 hover:text-white transition-all duration-150"
                >
                    <IcSair />
                    Sair
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-60 min-h-screen bg-[#D83D00] flex-col flex-shrink-0">
                {content}
            </aside>

            {/* Mobile sidebar overlay */}
            {mobileAberta && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-black/50 transition-opacity duration-200" onClick={onFecharMobile} />
                    <aside className="relative w-60 h-full bg-[#D83D00] flex flex-col shadow-2xl transition-transform duration-200">
                        <button
                            onClick={onFecharMobile}
                            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <IcFechar />
                        </button>
                        {content}
                    </aside>
                </div>
            )}
        </>
    );
}

// MODAL DE PRODUTO (Cadastro / Edição)
const FORM_VAZIO = { name: "", price: "", type: "", description: "", amount: "1" };

function ModalProduto({ aberto, onFechar, onSalvar, editando, salvando }) {
    const [form, setForm] = useState(FORM_VAZIO);
    const [fotoArq, setFotoArq] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);
    const [erros, setErros] = useState({});
    const inputFotoRef = useRef(null);

    // Preenche o form ao abrir
    useEffect(() => {
        if (!aberto) return;
        if (editando) {
            setForm({
                name: editando.name || "",
                price: editando.price || "",
                type: editando.type || "",
                description: editando.description || "",
                amount: editando.amount || "1",
            });
            setFotoPreview(editando.photo || null);
        } else {
            setForm(FORM_VAZIO);
            setFotoPreview(null);
        }
        setFotoArq(null);
        setErros({});
    }, [aberto, editando]);

    const normalizarPreco = (v) => String(v).replace(",", ".");

    const validar = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Nome obrigatório";
        const precoNorm = normalizarPreco(form.price);
        if (!precoNorm || isNaN(precoNorm) || +precoNorm <= 0) e.price = "Preço inválido";
        if (!form.type) e.type = "Selecione uma categoria";
        setErros(e);
        return !Object.keys(e).length;
    };

    const handleFoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFotoArq(file);
        const reader = new FileReader();
        reader.onload = (ev) => setFotoPreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validar()) return;
        onSalvar({ ...form, fotoArq });
    };

    if (!aberto) return null;

    const inputCls = (campo) =>
        `w-full px-3.5 py-2.5 rounded-xl text-sm text-gray-800 bg-gray-50
     border outline-none transition-all duration-200
     focus:ring-2 focus:ring-[#D83D00]/25 focus:border-[#D83D00]
     disabled:opacity-55
     ${erros[campo] ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-gray-200"}`;

    return (
        <div
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={(e) => e.target === e.currentTarget && onFechar()}
        >
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h2 className="text-gray-800 font-bold text-lg tracking-tight">
                        {editando ? "Editar produto" : "Novo produto"}
                    </h2>
                    <button
                        onClick={onFechar}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                        <IcFechar />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

                    {/* Upload de foto */}
                    <div className="flex flex-col items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => inputFotoRef.current?.click()}
                            className={`
                w-24 h-24 rounded-2xl overflow-hidden border-2 border-dashed
                flex items-center justify-center transition-colors group
                ${fotoPreview ? "border-[#D83D00]" : "border-gray-200 hover:border-[#D83D00] bg-gray-50"}
              `}
                        >
                            {fotoPreview ? (
                                <img src={fotoPreview} alt="preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-300 group-hover:text-[#D83D00] transition-colors">
                                    <IcImagem />
                                    <span className="text-[10px] mt-1 font-semibold">Adicionar foto</span>
                                </div>
                            )}
                        </button>
                        <input ref={inputFotoRef} type="file" accept="image/*" onChange={handleFoto} className="hidden" />
                        {fotoPreview && (
                            <button
                                type="button"
                                onClick={() => { setFotoPreview(null); setFotoArq(null); }}
                                className="text-[11px] text-gray-400 hover:text-red-500 transition-colors"
                            >
                                Remover foto
                            </button>
                        )}
                    </div>

                    {/* Nome */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">Nome do produto</label>
                        <input
                            className={inputCls("name")}
                            placeholder="Ex: Sabão em Pó"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            disabled={salvando}
                        />
                        {erros.name && <span className="text-red-500 text-xs">{erros.name}</span>}
                    </div>

                    {/* Preço + Categoria */}
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">Preço (R$)</label>
                            <input
                                className={inputCls("price")}
                                placeholder="0,00"
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                                disabled={salvando}
                            />
                            {erros.price && <span className="text-red-500 text-xs">{erros.price}</span>}
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">Categoria</label>
                            <select
                                className={inputCls("type")}
                                value={form.type}
                                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                                disabled={salvando}
                            >
                                <option value="">Selecionar...</option>
                                {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {erros.type && <span className="text-red-500 text-xs">{erros.type}</span>}
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                            Descrição <span className="font-normal normal-case text-gray-400">(opcional)</span>
                        </label>
                        <textarea
                            className={`${inputCls("")} resize-none`}
                            placeholder="Breve descrição do produto..."
                            rows={2}
                            value={form.description}
                            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                            disabled={salvando}
                        />
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onFechar}
                            disabled={salvando}
                            className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-55"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={salvando}
                            className="flex-1 py-3 rounded-2xl bg-[#D83D00] text-white text-sm font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-55 flex items-center justify-center gap-2"
                            style={{ boxShadow: "0 4px 16px rgba(216,61,0,0.35)" }}
                        >
                            {salvando
                                ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Salvando...</>
                                : editando ? "Salvar alterações" : "Cadastrar produto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
function ModalConfirmar({ aberto, produto, onConfirmar, onCancelar, salvando }) {
    if (!aberto || !produto) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-xs shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-gray-800 font-bold text-base">Excluir produto</h2>
                    <button onClick={onCancelar} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                        <IcFechar />
                    </button>
                </div>
                <div className="px-6 py-5">
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Tem certeza que deseja excluir{" "}
                        <strong className="text-gray-800">&ldquo;{produto.name}&rdquo;</strong>?{" "}
                        Essa ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={onCancelar}
                            disabled={salvando}
                            className="flex-1 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-55"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirmar}
                            disabled={salvando}
                            className="flex-1 py-2.5 rounded-2xl bg-red-600 text-white text-sm font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-55 flex items-center justify-center gap-2"
                        >
                            {salvando
                                ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                : "Excluir"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// TABELA DE PRODUTOS
function TabelaProdutos({ produtos, onEditar, onExcluir, carregando }) {
    if (carregando) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                <span className="w-8 h-8 border-[3px] border-gray-200 border-t-[#D83D00] rounded-full animate-spin" />
                <p className="text-sm">Carregando produtos...</p>
            </div>
        );
    }

    if (!produtos.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center text-[#D83D00]">
                    <IcPacote />
                </div>
                <p className="font-semibold text-gray-600 text-sm">Nenhum produto encontrado</p>
                <p className="text-xs text-center max-w-[200px] leading-relaxed">
                    Clique em &ldquo;Novo Produto&rdquo; para adicionar o primeiro item.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        {["Foto", "Nome", "Categoria", "Preço", ""].map((h) => (
                            <th
                                key={h}
                                className={`py-2 md:py-3 px-2 md:px-4 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider ${h === "" ? "text-right" : "text-left"}`}
                            >
                                {h === "Categoria" ? <span className="hidden sm:inline">Categoria</span> : h === "Nome" ? <span className="hidden sm:inline">Nome</span> : h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((p, i) => {
                        const id = p._id || p.id || i;
                        return (
                            <tr
                                key={id}
                                className="border-b border-gray-50 hover:bg-orange-50/50 transition-colors"
                            >
                                {/* Foto */}
                                <td className="py-2 md:py-3 px-2 md:px-4">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                                        {p.photo
                                            ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                                            : <span className="text-gray-300"><IcImagem size={14} /></span>}
                                    </div>
                                </td>

                                {/* Nome */}
                                <td className="py-2 md:py-3 px-2 md:px-4 max-w-[120px] md:max-w-[180px]">
                                    <p className="font-semibold text-gray-800 truncate text-xs md:text-sm">{p.name}</p>
                                    {p.description && (
                                        <p className="text-[10px] md:text-xs text-gray-400 truncate mt-0.5 hidden sm:block">{p.description}</p>
                                    )}
                                </td>

                                {/* Categoria */}
                                <td className="py-2 md:py-3 px-2 md:px-4">
                                    <span className="inline-block bg-orange-100 text-[#D83D00] text-[10px] md:text-xs font-bold px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full whitespace-nowrap">
                                        {p.type}
                                    </span>
                                </td>

                                {/* Preço */}
                                <td className="py-2 md:py-3 px-2 md:px-4">
                                    <span className="font-bold text-[#D83D00] whitespace-nowrap text-xs md:text-sm">
                                        R$ {Number(p.price).toFixed(2)}
                                    </span>
                                </td>

                                {/* Ações */}
                                <td className="py-2 md:py-3 px-2 md:px-4 text-right">
                                    <div className="flex items-center justify-end gap-1 md:gap-2">
                                        <button
                                            onClick={() => onEditar(p)}
                                            className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 rounded-lg md:rounded-xl text-xs font-semibold text-[#D83D00] bg-orange-50 hover:bg-orange-100 border border-orange-100 transition-colors"
                                        >
                                            <IcEditar /> <span className="hidden md:inline">Editar</span>
                                        </button>
                                        <button
                                            onClick={() => onExcluir(p)}
                                            className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 rounded-lg md:rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors"
                                        >
                                            <IcLixo /> <span className="hidden md:inline">Excluir</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

// CARD DE ESTATÍSTICA
function StatCard({ label, valor, detalhe }) {
    return (
        <div className="bg-white rounded-2xl px-4 md:px-5 py-3 md:py-4 border border-gray-100 shadow-sm flex flex-col gap-0.5 min-w-0">
            <p className="text-[10px] md:text-[11px] text-gray-400 font-bold uppercase tracking-wider truncate">{label}</p>
            <p className="text-xl md:text-2xl font-black text-gray-800 leading-tight truncate">{valor}</p>
            {detalhe && <p className="text-xs text-gray-400 truncate">{detalhe}</p>}
        </div>
    );
}

// DASHBOARD PRINCIPAL
export default function Dashboard() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const [editando, setEditando] = useState(null);
    const [aExcluir, setAExcluir] = useState(null);
    const [salvando, setSalvando] = useState(false);
    const [busca, setBusca] = useState("");
    const [sidebarAberta, setSidebarAberta] = useState(false);

    const { toasts, addToast, removeToast } = useToasts();

    // ── Carregar produtos ──────────────────────────────────────────────────────
    const carregarProdutos = useCallback(async () => {
        setCarregando(true);
        try {
            const res = await fetch(`${API_URL}/api/products/`);
            if (!res.ok) throw new Error("Falha ao buscar produtos");
            const data = await res.json();
            setProdutos(Array.isArray(data) ? data : []);
        } catch {
            addToast("Não foi possível carregar os produtos.", "error");
            setProdutos([]);
        } finally {
            setCarregando(false);
        }
    }, [addToast]);

    // Recarrega a lista silenciosamente (sem mostrar loading)
    const recarregarProdutos = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/products/`);
            if (!res.ok) throw new Error("Falha ao buscar produtos");
            const data = await res.json();
            setProdutos(Array.isArray(data) ? data : []);
        } catch {
            // silencioso — evita toasts duplicados
        }
    }, []);

    useEffect(() => { carregarProdutos(); }, [carregarProdutos]);

    // ── Sair ──────────────────────────────────────────────────────────────────
    const handleSair = () => { logout(); navigate("/"); };

    // ── Abrir modal ───────────────────────────────────────────────────────────
    const abrirCriar = () => { setEditando(null); setModalAberto(true); };
    const abrirEditar = (p) => { setEditando(p); setModalAberto(true); };
    const fecharModal = () => { setModalAberto(false); setEditando(null); };

    const normalizarPreco = (v) => String(v).replace(",", ".");

    // ── POST / PUT ────────────────────────────────────────────────────────────
    const handleSalvar = async ({ fotoArq, ...campos }) => {
        setSalvando(true);
        const token = getToken();
        if (!token) {
            addToast("Sessão expirada. Faça login novamente.", "error");
            setSalvando(false);
            return;
        }
        try {
            const payload = {
                name: campos.name.trim(),
                price: Number(normalizarPreco(campos.price)),
                type: campos.type,
                description: campos.description?.trim() || "",
                amount: Number(campos.amount) || 1,
            };

            if (editando) {
                // PUT
                const id = editando._id || editando.id;
                const res = await fetch(`${API_URL}/api/products/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    body: JSON.stringify(payload),
                });
                let data;
                try { data = await res.json(); } catch { data = {}; }
                if (!res.ok) throw new Error(data.error || `Erro ao atualizar produto (status ${res.status})`);

                setProdutos((prev) =>
                    prev.map((p) => (p._id || p.id) === id ? { ...p, ...payload } : p)
                );
                addToast("Produto atualizado com sucesso!", "success");
            } else {
                // POST
                const res = await fetch(`${API_URL}/api/products/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    body: JSON.stringify(payload),
                });
                let data;
                try { data = await res.json(); } catch { data = {}; }
                if (!res.ok) throw new Error(data.error || `Erro ao criar produto (status ${res.status})`);

                addToast("Produto cadastrado com sucesso!", "success");
                recarregarProdutos();
            }
            fecharModal();
        } catch (err) {
            addToast(err.message || "Erro ao salvar produto.", "error");
        } finally {
            setSalvando(false);
        }
    };

    // ── DELETE ────────────────────────────────────────────────────────────────
    const handleExcluir = async () => {
        if (!aExcluir) return;
        setSalvando(true);
        const token = getToken();
        if (!token) {
            addToast("Sessão expirada. Faça login novamente.", "error");
            setSalvando(false);
            return;
        }
        const id = aExcluir._id || aExcluir.id;
        try {
            const res = await fetch(`${API_URL}/api/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                let errorMsg = "Erro ao excluir produto";
                try {
                    const data = await res.json();
                    errorMsg = data.error || errorMsg;
                } catch {
                    errorMsg = `${errorMsg} (status ${res.status})`;
                }
                throw new Error(errorMsg);
            }
            addToast(`"${aExcluir.name}" foi excluído.`, "success");
            setAExcluir(null);
            recarregarProdutos();
        } catch (err) {
            addToast(err.message || "Erro ao excluir produto.", "error");
        } finally {
            setSalvando(false);
        }
    };

    // ── Filtrar ───────────────────────────────────────────────────────────────
    const produtosFiltrados = busca
        ? produtos.filter(
            (p) =>
                p.name?.toLowerCase().includes(busca.toLowerCase()) ||
                p.type?.toLowerCase().includes(busca.toLowerCase())
        )
        : produtos;

    // ── Stats ─────────────────────────────────────────────────────────────────
    const totalValor = produtos.reduce((s, p) => s + Number(p.price || 0), 0);
    const nCategorias = new Set(produtos.map((p) => p.type).filter(Boolean)).size;
    const maiorPreco = produtos.length
        ? Math.max(...produtos.map((p) => Number(p.price || 0)))
        : null;

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">

            {/* ── Sidebar ── */}
            <Sidebar ativa="produtos" onNavegar={() => {}} onSair={handleSair} mobileAberta={sidebarAberta} onFecharMobile={() => setSidebarAberta(false)} />


            {/* ── Área principal ── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Topbar */}
                <header className="bg-white border-b border-gray-100 px-4 md:px-8 py-3 md:py-5 flex items-center justify-between shadow-sm gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                        <button
                            onClick={() => setSidebarAberta(true)}
                            className="md:hidden text-gray-500 hover:text-[#D83D00] p-1.5 -ml-1 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                            aria-label="Abrir menu"
                        >
                            <IcMenu />
                        </button>
                        <div className="min-w-0">
                            <h1 className="text-gray-800 font-black text-lg md:text-xl tracking-tight truncate">
                                Produtos
                            </h1>
                            <p className="text-gray-400 text-xs md:text-sm mt-0.5 truncate">
                                {produtos.length} produto{produtos.length !== 1 ? "s" : ""} cadastrado{produtos.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <Link
                            to="/"
                            className="text-xs md:text-sm font-semibold text-gray-500 hover:text-[#D83D00] transition-colors whitespace-nowrap"
                        >
                            Ver loja →
                        </Link>
                        <button
                            onClick={abrirCriar}
                            className="flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-[#D83D00] text-white text-xs md:text-sm font-bold rounded-xl md:rounded-2xl hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
                            style={{ boxShadow: "0 4px 16px rgba(216,61,0,0.35)" }}
                        >
                            <IcMais /> <span className="hidden sm:inline">Novo Produto</span><span className="sm:hidden">Novo</span>
                        </button>
                    </div>
                </header>

                {/* Conteúdo */}
                <main className="flex-1 px-4 md:px-8 py-4 md:py-6 flex flex-col gap-4 md:gap-6">

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard label="Total de Produtos" valor={produtos.length} detalhe="itens no cardápio" />
                        <StatCard label="Valor Acumulado" valor={`R$ ${totalValor.toFixed(2)}`} detalhe="soma dos preços" />
                        <StatCard label="Categorias" valor={nCategorias} detalhe="tipos cadastrados" />
                        <StatCard
                            label="Produto mais caro"
                            valor={maiorPreco !== null ? `R$ ${maiorPreco.toFixed(2)}` : "—"}
                            detalhe="maior valor unitário"
                        />
                    </div>

                    {/* Card da tabela */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden flex-1">
                        {/* Cabeçalho do card */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 gap-3">
                            <h2 className="font-bold text-gray-800 text-sm md:text-base">Lista de produtos</h2>
                            <div className="relative w-full sm:w-auto">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <IcBusca />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-[#D83D00] focus:ring-2 focus:ring-[#D83D00]/20 transition-all w-full sm:w-56 md:w-64"
                                />
                            </div>
                        </div>

                        <TabelaProdutos
                            produtos={produtosFiltrados}
                            onEditar={abrirEditar}
                            onExcluir={setAExcluir}
                            carregando={carregando}
                        />
                    </div>
                </main>
            </div>

            {/* ── Modais ── */}
            <ModalProduto
                aberto={modalAberto}
                onFechar={fecharModal}
                onSalvar={handleSalvar}
                editando={editando}
                salvando={salvando}
            />
            <ModalConfirmar
                aberto={!!aExcluir}
                produto={aExcluir}
                onConfirmar={handleExcluir}
                onCancelar={() => setAExcluir(null)}
                salvando={salvando}
            />

            {/* ── Toasts ── */}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
    );
}