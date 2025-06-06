import { ChevronDown, CircleAlert, CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FalhasListItem } from "./FalhasListItem";
import { ProgressBar } from "./ProgressBar";

export function SessaoLivros({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const getStatusIcon = (successTests, totalTests) => {
        const successRate = (successTests / totalTests) * 100;

        if (successRate === 100) {
            return <CircleCheck className="w-5 text-[#6BBF77] mr-4" />;
        } else if (successRate > 50) {
            return <CircleAlert className="w-5 text-[#FFDD03] mr-4" />;
        } else {
            return <CircleX className="w-5 text-[#EE1D1D] mr-4" />;
        }
    };



    const tempoMedioTotal = (
        data.methodTestsResults.reduce((acc, m) => acc + m.avarageDurationMillisInGroup, 0) /
        data.methodTestsResults.length
    ).toFixed(1);

    const memoriaTotal = (
        data.methodTestsResults.reduce((acc, m) => acc + m.avarageMemoryUsageMbInGroup, 0)
    ).toFixed(0);

    return (
        <div className="bg-[#F7F7F7] overflow-hidden">
            <div
                onClick={toggle}
                className="w-full flex justify-between items-center py-4 cursor-pointer"
            >
                <div className="flex gap-6 items-center">
                    <span className="text-xl text-[#555555]">Livros</span>
                    <ProgressBar progress={Math.round(data.successPercentage)} />

                </div>
                <ChevronDown
                    className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="livros"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="w-full flex gap-4">
                            {/* Métricas */}
                            <div className="flex-col w-3/5">
                                <div className="flex gap-6">
                                    <div className="w-1/2 h-52 rounded-xl border border-[#d1d1d1] flex flex-col items-center justify-center gap-4">
                                        <p className="text-sm">Tempo médio de execução</p>
                                        <div className="flex flex-col items-center justify-center gap-1">
                                            <p className="text-5xl">{tempoMedioTotal}</p>
                                            <p className="text-xs">milissegundos</p>
                                        </div>
                                    </div>
                                    <div className="w-1/2 h-52 rounded-xl border border-[#d1d1d1] flex flex-col items-center justify-center gap-4">
                                        <p className="text-sm">Memória total consumida</p>
                                        <div className="flex flex-col items-center justify-center gap-1">
                                            <p className="text-5xl">{memoriaTotal}</p>
                                            <p className="text-xs">MBs</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Resultados dos métodos */}
                                <div className="flex flex-col gap-3 mt-3 overflow-y-auto custom-scrollbar">
                                    <div className="w-full flex items-center justify-start">
                                        <p className="text-xs w-64"></p>
                                        <div className="flex w-[58%] justify-between">
                                            <p className="text-xs">Status dos testes</p>
                                            <p className="text-xs">Tempo de execução</p>
                                            <p className="text-xs mr-4">Memória utilizada</p>
                                        </div>
                                    </div>
                                    {data.methodTestsResults.map((method) => {
                                        return (
                                            <div
                                                key={method.methodName}
                                                className="rounded-xl border border-[#d1d1d1] h-12 w-full p-4 flex items-center justify-start"
                                            >
                                                {getStatusIcon(method.successTests, method.totalTests)}
                                                <p className="text-xs w-60">{method.methodName}</p>
                                                <div className="flex gap-2 w-[50%] justify-between">
                                                    <p className="text-xs">{`${method.successTests}/${method.totalTests}`}</p>
                                                    <p className="text-xs">{Math.round(method.avarageDurationMillisInGroup)}ms</p>
                                                    <p className="text-xs">
                                                        {Math.round(method.avarageMemoryUsageMbInGroup)}Mb
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Falhas */}
                            <div className="rounded-xl border border-[#d1d1d1] w-2/5 p-8">
                                <p className="font-semibold mb-4">Falhas</p>
                                <div className="flex flex-col gap-4 overflow-y-auto max-h-full custom-scrollbar">
                                    {data.methodTestsResults
                                        .flatMap((m) => m.individualTestResults)
                                        .filter((t) => !t.success)
                                        .map((fail, index) => (
                                            <FalhasListItem
                                                key={index}
                                                endpoint={fail.targetEndpoint}
                                                service={fail.testName}
                                                tempoExecucao={`${fail.durationMillis} ms`}
                                                status={fail.httpStatus}
                                                json={{}}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
