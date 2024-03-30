import React, { useEffect, useState } from "react";
import axios from 'axios';

const WeatherCard = ({ user }) => {
    const [temprature,setTemprature] = useState('0');
    const [image,setImage] = useState('none');
    const [info,setInfo] = useState('');
    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: { q: 'jalandhar' },
            headers: {
                'X-RapidAPI-Key': '91b9472b6emsha3407ebdd1f59d2p17992djsnb475861a76be',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setTemprature(response.data.current.feelslike_c);
            setImage(response.data.current.condition.icon);
            setInfo(response.data.current.condition.text);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        
        fetchData();
    }, []); // Empty dependency array to run effect only once on mount

    return (
        <div className='w-full  bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4 '>
            <div className="w-full h-full items-center flex flex-col md:flex-row md:justify-center">
                <div className="w-full transition duration-500 ease-in-out transform bg-primary rounded-lg hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center p-6">
                    <div className="text-md font-bold flex flex-col text-white"><span className="uppercase">Today</span></div>
                    <div className="w-32 h-full flex items-center justify-center">
                        
                            <img src={image} alt="weather condition" />
                    </div>
                    <p className="text-white mb-2">{(info) ? info : "pretty clouds"}</p>
                    <div className="text-3xl font-bold text-white mb-6">{temprature}º</div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
