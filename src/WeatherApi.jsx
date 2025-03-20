
import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./Weather.css"

function WeatherApi() {



    const [ApiData, SetData] = useState([]);
    const [Zone, setZone] = useState("Mumbai");
    const api_key = "faeee45c68056e0739be249d9a222c41";
   
    const fetchWeather = async (query) => {
        const news = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Zone}&units=metric&appid=${api_key}`);

        const data = await news.json();
        SetData(data)


    };
    useEffect(() => {
        fetchWeather(Zone);
    }, []);

    const SearchNewsHandler = async (event) => {
        event.preventDefault();
        fetchWeather(Zone);
        console.log(ApiData);




    };
    return (
        <>
            <div id="forms">
                <h1 className='Head'>TheWeather</h1>

                <form onSubmit={SearchNewsHandler} className="form" id="Form">
                    <input
                        type="text"
                        value={Zone}
                        className="zone"
                        onChange={(e) => setZone(e.target.value)}
                        placeholder="Enter a city or topic"
                    />
                    <button type="submit" className="ibtn"><FontAwesomeIcon icon={faMagnifyingGlass} id='ic' /></button>
                </form>


            </div>
            {/* <section className="content">
                {ApiData && ApiData.main ?(
                    (
                        <div className="data" >
                            <h4 className='title'>City : {ApiData.name}</h4>
                            <h4 className="title">Current Tempreture : {ApiData.main.temp}°C</h4>
                            <h4 className='title'>Feels Like : {ApiData.main.feels_like}</h4>
                            <h4 className='title'>humidity : {ApiData.main.humidity}</h4>
                            <h4 className='title'>humidity : {ApiData.main.temp_max}</h4>
                            <h4 className='title'>humidity : {ApiData.main.humidity}</h4>




                        </div>
                    )
                )}


            </section> */}

            <section className="content">
                {ApiData && ApiData.main ? (
                    <div className="data">

                        {ApiData.weather && ApiData.weather[0] && (
                            <div className="weather">
                                <h4 className="title">City: {ApiData.name}  , {ApiData.sys.country}</h4>
                                <img
                                    src={`http://openweathermap.org/img/wn/${ApiData.weather[0].icon}@2x.png`}
                                    alt={ApiData.weather[0].description}
                                />
                                <h4 className="title">Condition: {ApiData.weather[0].description}</h4>
                            </div>
                        )}
                        <ul className='ul'>

                            <li>
                                <h4 className="title">Current Temperature: {ApiData.main.temp}°C</h4>
                            </li>
                            <li>
                                <h4 className="title">Feels Like: {ApiData.main.feels_like}°C</h4>

                            </li>
                            <li>

                                <h4 className="title">Humidity: {ApiData.main.humidity}%</h4>
                            </li>
                            <li>
                                <h4 className="title">Max Temperature: {ApiData.main.temp_max}°C</h4>
                            </li>
                        </ul>

                    </div>

                ) : (
                    <div className="loader"></div>
                )}
            </section>

        </>
    );
}

export default WeatherApi;

