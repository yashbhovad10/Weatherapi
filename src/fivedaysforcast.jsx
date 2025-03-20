import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Weatherforest = () => {
    const [city, setCity] = useState("Mumbai");
    const [weatherData, setWeatherData] = useState(null);
    const [groupedData, setGroupedData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiData, setApiData] = useState(null);
    const [showForecast, setShowForecast] = useState(false); 

    const API_KEY = "faeee45c68056e0739be249d9a222c41"; 

    const fetchCurrentWeather = async (inputCity) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            setApiData(data);
        } catch (err) {
            console.error("Error fetching current weather:", err);
        }
    };

    const fetchWeather = async () => {
        if (!city) return;

        setLoading(true);
        setError(null);
        setShowForecast(true); 

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            console.log(data)

            if (data.cod !== "200") {
                throw new Error(data.message);
            }

            setWeatherData(data);

            // Group data by date
            const grouped = data.list.reduce((acc, item) => {
                const date = item.dt_txt.split(" ")[0]; 
                console.log(date);
                if (!acc[date]) acc[date] = [];
                acc[date].push(item);
                console.log(acc)
                return acc;
            },{});

            setGroupedData(grouped);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentWeather(city);
    }, []);

    return (
        <div className="container text-center mt-5">
            <h2 className="mb-4">Weather Forecast</h2>

            {/* City Input */}
            <div className="container my-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Enter city name"
                                className="form-control form-control-lg"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    fetchWeather(); 
                                    fetchCurrentWeather(city); 
                                }}
                            >
                                Get Weather
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Weather Data */}
            <section className="container my-4">
                {apiData && apiData.main ? (
                    <div className="card shadow p-4" style={{ background: "rgb(100,149,237)" }}>
                        {apiData.weather && apiData.weather[0] && (
                            <div className="text-center mb-4">
                                <h4 className="fw-bold">
                                    {apiData.name}, {apiData.sys.country}
                                </h4>
                                <img
                                    src={`http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`}
                                    alt={apiData.weather[0].description}
                                    className="img-fluid"
                                />
                                <h5 className="text-capitalize">{apiData.weather[0].description}</h5>
                            </div>
                        )}

                        <ul className="list-group text-white">
                            <li className="list-group-item d-flex justify-content-between text-white" style={{ background: "linear-gradient(165deg, rgba(44, 20, 219, 1), rgba(92, 122, 255, 1))" }}>
                                <span>Current Temperature:</span>
                                <strong>{apiData.main.temp}°C</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white" style={{ background: "linear-gradient(165deg, rgba(44, 20, 219, 1), rgba(92, 122, 255, 1))" }}>
                                <span>Feels Like:</span>
                                <strong>{apiData.main.feels_like}°C</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white" style={{ background: "linear-gradient(165deg, rgba(44, 20, 219, 1), rgba(92, 122, 255, 1))" }}>
                                <span>Humidity:</span>
                                <strong>{apiData.main.humidity}%</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between text-white" style={{ background: "linear-gradient(165deg, rgba(44, 20, 219, 1), rgba(92, 122, 255, 1))" }}>
                                <span>Max Temperature:</span>
                                <strong>{apiData.main.temp_max}°C</strong>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="text-center mt-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </section>

            {/* Show 5-Day Forecast Only When Button is Clicked */}
            {showForecast && weatherData && (
                <div className="w-100">
                    <h3 className="mb-3">
                        Next five days forecast for <span style={{ color: "red" }}>{weatherData.city.name}, {weatherData.city.country}</span>
                    </h3>

                    {Object.entries(groupedData).map(([date, data]) => (
                        <div key={date} className="card mb-3 p-3" style={{ backgroundColor: "skyblue" }}>
                            <h4 className="mb-3">Date: {date}</h4>
                            <div className="row">
                                {data.map((item) => (
                                    <div key={item.dt} className="col-md-3 mb-3">
                                        <div className="card p-2" style={{ background: "linear-gradient(165deg, rgba(44, 20, 219, 1), rgba(92, 122, 255, 1))" }}>
                                            <p className="fw-bold">Time: {new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                                            <p className="fs-5">Temp: {(item.main.temp).toFixed(1)}°C</p>
                                            <p className="fs-5">Feels Like: {(item.main.feels_like).toFixed(1)}°C</p>
                                            <p className="fs-5">Weather: {item.weather[0].description}</p>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                                alt={item.weather[0].description}
                                                className="img-fluid mx-auto"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <h4>Thank You!</h4>
        </div>
    );
};

export default Weatherforest