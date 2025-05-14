export const WeatherInfo = ({ info, name }) => {
    return (
        <div className="flex flex-col justify-center border-2 rounded-xl gap-2 px-4 py-3 min-w-[110px] max-w-[150px] text-center hover:border-gray-400 hover:text-gray-400 text-gray-600 transition-colors duration-300">
            <div>
                <h1 className="font-semibold text-sm sm:text-base">{name ? name : ""}</h1>
            </div>
            <div>
                <h1 className="font-semibold text-sm sm:text-base">{info ? info : ""}</h1>
            </div>
        </div>
    );
};
