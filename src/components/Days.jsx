export const Days = ({ data }) => {

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
    };

    return (
        <div className="border-2 rounded-xl hover:border-gray-400 text-gray-600 hover:text-gray-400 w-full max-w-[140px] flex-1 min-w-[100px] transition-colors duration-300">
            <div className="h-full flex justify-center items-center flex-col gap-2 py-4 px-2">
                <div className="flex items-center justify-center">
                    <h1 className="font-bold text-lg sm:text-xl">{data ? getDayOfWeek(data.date) : ""}</h1>
                </div>

                <div className="flex items-center justify-center">
                    <img
                        src={data ? data.day.condition.icon : ""}
                        alt="icon"
                        className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                </div>

                <div className="flex items-center justify-center text-center px-1">
                    <h1 className="font-bold text-sm sm:text-base">{data?.day.condition.text}</h1>
                </div>

                <div className="flex items-center justify-center">
                    <h1 className="font-bold text-base sm:text-lg">
                        {data ? data.day.maxtemp_c : ""}<sup>o</sup>C
                    </h1>
                </div>
            </div>
        </div>
    );
};
