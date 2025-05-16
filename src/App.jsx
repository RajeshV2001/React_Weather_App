import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getWeatherData } from "./api/index.js";
import { Days } from "./components/Days.jsx";
import { WeatherInfo } from "./components/WeatherInfo.jsx";
import { RefreshCw } from 'lucide-react';

function App() {
  const [location, setLocation] = useState("India");
  const [buttonClick, setButtonClick] = useState(false);
  const [refresh,setRefresh] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {  
    getWeatherData(location).then((data) => { 
      setData(data);
    });
    return () => {
      setButtonClick(false);
      setRefresh(false);
    }
  }, [buttonClick,refresh]);

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-5xl h-auto md:h-[90%] p-6 transform hover:scale-[1.01] transition-all duration-300 hover:border-gray-400">
          <div className="flex justify-center mt-6">
            <h1 className="font-bold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">WEATHER APP</h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 mt-6 px-2">
            <div className="w-full sm:w-1/2">
              <input
                className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg p-2 text-gray-300 placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors duration-300"
                type="text"
                placeholder="Enter location..."
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
            <div className="w-full sm:w-auto">
              <button
                className="w-full sm:w-[10vh] bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg p-2 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={() => {
                  setButtonClick(true)
                }}
              >
                Search
              </button>
            </div>
          </div>

          <div className="px-4 sm:px-8 mt-12 flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="flex font-bold text-2xl sm:text-4xl text-gray-300">
                {data ? data.location.country : ""}, {data ? data.location.name : ""}
              </h1>
              <button
              className='p-2 ronded-full transition'
              onClick={() => {
                    setRefresh(true)
              }}>
                <RefreshCw
                  className = {`text-gray-500 hover:text-gray-300 transition-transform ${refresh ? "animate-spin" : ""}`}
                />
             </button>
            </div>
            <h3 className="font-semibold text-sm text-gray-400">
              {(() => {
                const today = new Date();
                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                return `${days[today.getDay()]}, ${today.toLocaleDateString()}`;
              })()}
            </h3>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-20 bg-gray-700/30 rounded-xl p-4">
            <div className="flex justify-center">
              <img
                src={data ? data.current.condition.icon : ""}
                alt="Image icon"
                className="transform hover:scale-110 transition-transform duration-300 w-20 h-20 md:w-auto md:h-auto"
              />
            </div>

            <div className="flex flex-col justify-center text-center md:text-left">
              <h1 className="font-bold text-4xl md:text-6xl text-gray-300">
                {data?.current?.temp_c}<sup>o</sup>C
              </h1>
              <h3 className="font-semibold text-gray-400">{data ? data.current.condition.text : ""}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 justify-center">
              <WeatherInfo info={data?.current?.humidity} name="Humidity" />
              <WeatherInfo info={data?.current?.wind_kph} name="Wind_KPH" />
              <WeatherInfo info={data?.current?.air_quality['us-epa-index']} name="AQI" />
              <WeatherInfo info={data?.current?.wind_dir} name="Wind Direction" />
            </div>
          </div>

          <div className="mt-6 px-2">
            <h1 className="font-bold text-xl text-white">Next 6 Days</h1>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-5 px-2">
            {data?.forecast?.forecastday
              ?.filter((item) => {
                const forecastDate = new Date(item.date);
                const today = new Date();
                return (
                  forecastDate.getDate() !== today.getDate() ||
                  forecastDate.getMonth() !== today.getMonth() ||
                  forecastDate.getFullYear() !== today.getFullYear()
                );
              })
              .map((item, index) => (
                <Days key={index} data={item} />
              )) || <p className="text-gray-400">No forecast data available</p>}
          </div>
        </div>
      </div>
    </>
  );
}


  // return (
  //   <>
  //       <div className="h-screen border-2 border-amber-300 flex items-center justify-center">
  //           <div className="border-2 border-amber-800 w-[50%] h-[80%] p-2">
  //               <div className="flex justify-center mt-6">
  //                   <h1 className="font-bold text-4xl text-sky-700">WEATHER APP</h1>
  //               </div>
  //
  //               <div className="flex justify-center gap-10 mt-6">
  //
  //                   <div className="w-[50%]">
  //                       <input className="w-full border-1 p-2" type="text" placeholder="Enter location..." onChange={(event)=>setLocation(event.target.value)}/>
  //                   </div>
  //                   <div>
  //                       <button className="border-2 border-red-800 hover:bg-red-700 rounded-md p-2 w-[10vh] font-semibold" onClick={()=> setButtonClick(true)}>Submit</button>
  //                   </div>
  //
  //               </div>
  //
  //               <div className="px-8 mt-12 flex flex-col gap-2">
  //                   <h1 className="font-bold text-4xl ">{data ? data.location.country : ""}, {data ? data.location.name : ""}</h1>
  //                   <h3 className="font-semibold text-s text-gray-600">
  //                       {(() => {
  //                           const today = new Date();
  //                           const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //                           return `${days[today.getDay()]}, ${today.toLocaleDateString()}`;
  //                       })()}
  //                   </h3>
  //               </div>
  //
  //
  //               <div className="mt-8 flex flex-row gap-20 h-[23%]">
  //                   <img src={data ? data.current.condition.icon : ""} alt="Image icon"/>
  //                   <div className="flex flex-col">
  //                       <h1 className="font-bold text-6xl">{data?.current?.temp_c}<sup>o</sup>C</h1>
  //                       <h3 className="font-semibold text-gray-600">{data ? data.current.condition.text : ""}</h3>
  //                   </div>
  //                   <div className="grid grid-cols-2">
  //                       <WeatherInfo info={data?.current?.humidity} name = "Humidity" />
  //                       <WeatherInfo info={data?.current?.wind_kph} name = "Wind_KPH" />
  //                       <WeatherInfo info={data?.current?.air_quality['us-epa-index']} name = "AQI" />
  //                       <WeatherInfo info={data?.current?.wind_dir} name="Wind Direction"/>
  //                   </div>
  //               </div>
  //
  //               <div className="mt-6 px-2">
  //                   <h1 className="font-bold">Next 6 Days</h1>
  //               </div>
  //
  //               <div className="flex justify-around gap-2 h-[30%] mt-5">
  //                   {data?.forecast?.forecastday
  //                       ?.filter((item) => {
  //                           const forecastDate = new Date(item.date);
  //                           const today = new Date();
  //                           return (
  //                               forecastDate.getDate() !== today.getDate() ||
  //                               forecastDate.getMonth() !== today.getMonth() ||
  //                               forecastDate.getFullYear() !== today.getFullYear()
  //                           );
  //                       })
  //                       .map((item, index) => (
  //                           <Days key={index} data={item} />
  //                       )) || <p>No forecast data available</p>}
  //               </div>
  //           </div>
  //       </div>
  //   </>
  // )

  
export default App
