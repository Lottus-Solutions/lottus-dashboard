import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FalhasListItem({
    endpoint,
    service,
    tempoExecucao,
    status,
    json,
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Linha principal */}
            <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-3">
                    <ChevronDown
                        className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                    <div className="text-sm italic text-[#555555]">{endpoint}</div>
                    <div className="text-sm rounded text-[#F25050]">
                        {service}
                    </div>
                </div>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="w-full border border-[#E5E5E5] rounded-xl p-4 mt-2">
                    <p className="text-xs">Status: <span className="text-xs text-[#555555]">{status}</span></p>
                    <p className="text-xs">Tempo de execução: <span className="text-xs text-[#555555]">{tempoExecucao}</span></p>
                    <pre className="text-xs text-[#555555] mt-3">
                        {JSON.stringify(json, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
