export const WeatherInfo = ({info,name})=> {
    return (
        <div className="flex flex-col justify-center border-2 rounded-xl gap-2 w-[18vh] h-[7vh] mx-1 hover:border-gray-400 hover:text-gray-400 text-gray-600">
            <div className="flex justify-center">
                <h1 className="font-semibold ">{name ? name :""}</h1>
            </div>
            <div className="flex justify-center">
                <h1 className="font-semibold  ">{info ? info : ""}</h1>
            </div>
        </div>
    )
}