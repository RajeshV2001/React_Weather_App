import axios from "axios";

export const getWeatherData = async (location) => {
    try {
        const apiKey = "bd32dd6c234a49f8801100105252701";
        const endpoint = "http://api.weatherapi.com/v1/forecast.json";


        const response = await axios.get(endpoint, {
            params: {
                key: apiKey,
                q: location,
                days:7,
                aqi: "yes"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};
