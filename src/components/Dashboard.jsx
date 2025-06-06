import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SessaoAlunos } from "./SessaoAlunos";
import { SessaoEmprestimos } from "./SessaoEmprestimo";
import { SessaoLivros } from "./SessaoLivros";
import { SessaoTurmas } from "./SessaoTurmas";
import { ChevronLeft } from "lucide-react";
import { SessaoCategorias } from "./SessaoCategorias";

export function Dashboard() {
    const [loading, setLoading] = useState(true);

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // Simula carregamento
        return () => clearTimeout(timer);
    }, []);

    const emprestimosJson = {
        moduleName: "Emprestimos",
        totalTests: 7,
        sucessfulTests: 3,
        failedTests: 4,
        successPercentage: 42.857142857142854,
        methodTestsResults: [
            {
                methodName: "RenovarEmprestimo",
                totalTests: 1,
                failedTests: 1,
                successTests: 0,
                avarageDurationMillisInGroup: 158.0,
                avarageMemoryUsageMbInGroup: 450.30286407470703,
                individualTestResults: [
                    {
                        testName: "Emprestimo_Renovar_Sucesso",
                        targetEndpoint: "/emprestimos/1/renovar",
                        success: false,
                        durationMillis: 158,
                        httpStatus: 404,
                        targetServiceMemoryUsedMB: 450.30286407470703,
                        methodGroupKey: "RenovarEmprestimo"
                    }
                ]
            },
            {
                methodName: "NovoEmprestimo",
                totalTests: 1,
                failedTests: 1,
                successTests: 0,
                avarageDurationMillisInGroup: 84.0,
                avarageMemoryUsageMbInGroup: 447.93956756591797,
                individualTestResults: [
                    {
                        testName: "Emprestimo_Novo_Sucesso",
                        targetEndpoint: "/emprestimos",
                        success: false,
                        durationMillis: 84,
                        httpStatus: 500,
                        targetServiceMemoryUsedMB: 447.93956756591797,
                        methodGroupKey: "NovoEmprestimo"
                    }
                ]
            },
            {
                methodName: "HistoricoAluno",
                totalTests: 1,
                failedTests: 1,
                successTests: 0,
                avarageDurationMillisInGroup: 52.0,
                avarageMemoryUsageMbInGroup: 445.8964538574219,
                individualTestResults: [
                    {
                        testName: "Emprestimo_HistoricoAluno_Sucesso",
                        targetEndpoint: "/emprestimos/historico/aluno/1",
                        success: false,
                        durationMillis: 52,
                        httpStatus: 500,
                        targetServiceMemoryUsedMB: 445.8964538574219,
                        methodGroupKey: "HistoricoAluno"
                    }
                ]
            },
            {
                methodName: "HistoricoLivro",
                totalTests: 1,
                failedTests: 0,
                successTests: 1,
                avarageDurationMillisInGroup: 69.0,
                avarageMemoryUsageMbInGroup: 447.95601654052734,
                individualTestResults: [
                    {
                        testName: "Emprestimo_HistoricoLivro_Sucesso",
                        targetEndpoint: "/emprestimos/historico/livro/1",
                        success: true,
                        durationMillis: 69,
                        httpStatus: 200,
                        targetServiceMemoryUsedMB: 447.95601654052734,
                        methodGroupKey: "HistoricoLivro"
                    }
                ]
            },
            {
                methodName: "FinalizarEmprestimo",
                totalTests: 1,
                failedTests: 1,
                successTests: 0,
                avarageDurationMillisInGroup: 90.0,
                avarageMemoryUsageMbInGroup: 448.02030181884766,
                individualTestResults: [
                    {
                        testName: "Emprestimo_Finalizar_Sucesso",
                        targetEndpoint: "/emprestimos/1/finalizar",
                        success: false,
                        durationMillis: 90,
                        httpStatus: 404,
                        targetServiceMemoryUsedMB: 448.02030181884766,
                        methodGroupKey: "FinalizarEmprestimo"
                    }
                ]
            },
            {
                methodName: "ListarEmprestimosAtrasados",
                totalTests: 1,
                failedTests: 0,
                successTests: 1,
                avarageDurationMillisInGroup: 50.0,
                avarageMemoryUsageMbInGroup: 450.2667694091797,
                individualTestResults: [
                    {
                        testName: "Emprestimo_ListarAtrasados_Sucesso",
                        targetEndpoint: "/emprestimos/atrasados",
                        success: true,
                        durationMillis: 50,
                        httpStatus: 200,
                        targetServiceMemoryUsedMB: 450.2667694091797,
                        methodGroupKey: "ListarEmprestimosAtrasados"
                    }
                ]
            },
            {
                methodName: "ListarEmprestimosPaginado",
                totalTests: 1,
                failedTests: 0,
                successTests: 1,
                avarageDurationMillisInGroup: 130.0,
                avarageMemoryUsageMbInGroup: 450.1347961425781,
                individualTestResults: [
                    {
                        testName: "Emprestimo_ListarPaginado_Sucesso",
                        targetEndpoint: "/emprestimos?pagina=0&tamanho=5&busca=&atrasados=false",
                        success: true,
                        durationMillis: 130,
                        httpStatus: 200,
                        targetServiceMemoryUsedMB: 450.1347961425781,
                        methodGroupKey: "ListarEmprestimosPaginado"
                    }
                ]
            }
        ]
    };

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
                    className="min-w-30 w-fit h-9 flex items-center justify-center px-4 rounded-full bg-[#0292B7] border-[1px] border-[#0292B7] text-white cursor-pointer text-sm relative top-8"

                >
                    Executar Testes
                </button>
            </div>

            <p className="text-[#555555] mt-1">Por serviço</p>

            <div className="mt-10 flex flex-col gap-4">
                <SessaoTurmas data={emprestimosJson} />
                <SessaoAlunos data={emprestimosJson} />
                <SessaoCategorias data={emprestimosJson} />
                <SessaoLivros data={emprestimosJson} />
                <SessaoEmprestimos data={emprestimosJson} />
            </div>
        </motion.div>
    );
}
