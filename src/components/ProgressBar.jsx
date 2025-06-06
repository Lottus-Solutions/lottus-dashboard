export function ProgressBar({ progress }) {
    // Definindo a cor com base no valor do progresso
    const getColor = () => {
        if (progress < 50) return '#F25050';      // Vermelho
        if (progress < 75) return '#FFDD03';      // Amarelo
        return '#6BBF77';                         // Verde
    };

    return (
        <div className="w-64 bg-gray-200 rounded-full h-5 relative flex items-center">
            {/* Barra de progresso */}
            <div
                className="h-5 rounded-full absolute top-0 left-0"
                style={{
                    width: `${progress}%`,
                    backgroundColor: getColor(),
                    zIndex: 0,
                    opacity: 0.9,
                }}
            ></div>

            {/* Texto fixo na direita */}
            <div className="flex justify-end w-full pr-2 z-10">
                <span className="text-xs">{progress}%</span>
            </div>
        </div>
    );
}
