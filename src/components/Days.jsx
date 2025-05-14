export const Days = ({data}) => {

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
    };

    return (
        <div className="border-2 rounded-xl w-[20%] hover:border-gray-400 text-gray-600 hover:text-gray-400">
            <div className="h-full flex justify-center items-center flex-col gap-4">
                <div className="flex items-center justify-center">
                    <h1 className="font-bold text-2xl ">{data ? getDayOfWeek(data.date): ""}</h1>
                </div>
                <div className="flex items-center justify-center">
                    <h1 className="font-bold text-xl">
                        <img src={data ? data.day.condition.icon : ""} alt="icon"/>
                    </h1>
                </div>

                <div className="flex items-center justify-center">
                    <h1 className="font-bold text-xl ">{data?.day.condition.text}</h1>
                </div>


                <div className="flex items-center justify-center flex-col gap-4">
                    <h1 className="font-bold text-xl t">{data ? data.day.maxtemp_c : ""}<sup>o</sup>C</h1>
                </div>

            </div>
        </div>
    )
}