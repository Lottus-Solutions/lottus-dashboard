import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SessaoAlunos } from "./SessaoAlunos";
import { SessaoEmprestimos } from "./SessaoEmprestimo";
import { SessaoLivros } from "./SessaoLivros";
import { SessaoTurmas } from "./SessaoTurmas";
import { ChevronLeft } from "lucide-react";
import { SessaoCategorias } from "./SessaoCategorias";
import axios from "../configs/axiosConfig"; // ajuste o caminho conforme a pasta

export function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [turmasData, setTurmasData] = useState(null);
    const [alunosData, setAlunosData] = useState(null);
    const [categoriasData, setCategoriasData] = useState(null);
    const [livrosData, setLivrosData] = useState(null);
    const [emprestimosData, setEmprestimosData] = useState(null);
    const [executando, setExecutando] = useState(false);

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    async function executarPipelineDeTestes() {
        try {
            setExecutando(true);

            const post = async (url) => {
                const response = await axios.post(url);
                return response.data;
            };

            await post("/data-admin/cleanup/all");

            const turmas = await post("/v1/trigger-tests/module/turmas");
            setTurmasData(turmas);

            const alunos = await post("/v1/trigger-tests/module/alunos");
            setAlunosData(alunos);

            const categorias = await post("/v1/trigger-tests/module/categorias");
            setCategoriasData(categorias);

            const livros = await post("/v1/trigger-tests/module/livros");
            setLivrosData(livros);

            const emprestimos = await post("/v1/trigger-tests/module/emprestimos");
            setEmprestimosData(emprestimos);

        } catch (err) {
            console.error("Erro ao executar pipeline de testes:", err);
            alert("Erro ao executar os testes. Verifique o console.");
        } finally {
            setExecutando(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#F7F7F7]">
                <div className="w-6 h-6 border-2 border-[#0292B7] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#F7F7F7] max-w-screen h-screen px-20 py-20 overflow-y-scroll custom-scrollbar relative"
        >
            <button
                onClick={handleLogout}
                className="absolute top-10 left-10 flex items-center cursor-pointer text-[#555555]"
            >
                <ChevronLeft size={24} />
            </button>

            <div className="flex justify-between items-center">
                <h2 className="text-3xl text-[#0292B7] font-semibold">
                    Painel de testes da aplicação
                </h2>
                <button
                    onClick={executarPipelineDeTestes}
                    disabled={executando}
                    className={`min-w-30 w-fit h-9 flex items-center justify-center px-4 rounded-full ${executando ? "bg-gray-400" : "bg-[#0292B7]"} border-[1px] border-[#0292B7] text-white cursor-pointer text-sm relative top-8`}
                >
                    {executando ? "Executando..." : "Executar Testes"}
                </button>
            </div>

            <p className="text-[#555555] mt-1">Por serviço</p>

            <div className="mt-10 flex flex-col gap-4">
                {turmasData && <SessaoTurmas data={turmasData} />}
                {alunosData && <SessaoAlunos data={alunosData} />}
                {categoriasData && <SessaoCategorias data={categoriasData} />}
                {livrosData && <SessaoLivros data={livrosData} />}
                {emprestimosData && <SessaoEmprestimos data={emprestimosData} />}
            </div>
        </motion.div>
    );
}
