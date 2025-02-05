import React, { use, useEffect, useState } from 'react'
// import axios from 'axios'
import { MdOutlineSearch } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";
import '../Weather.css';
import erroeFound from '../assets/404.jpg'




// Import Weather images
import clearIcon from '../assets/clear.png';              
import fewIcon from '../assets/few.png'                 
import scatterdIcon from '../assets/scattered.png'
import brokenIcon from '../assets/broken.png'
import rainIcon from '../assets/rain.png'
import thunderstormIcon from '../assets/thunder.png'
import snowIcon from '../assets/snow.png'
// ----------------------------------------------------//

function Weather() {
    const [icon,setIcon] = useState()
    const [value,setValue] = useState("Chennai")  
    const [city,setCity] = useState()
    const [date,setDate] = useState()
    const [temp,setTemp] = useState()
    const [Humidity,setHumidity] = useState()
    const [wind,setWind] = useState()
    const [errormsg,setError] = useState('')
    const [notFound,setFound]  = useState(false)
    const [loading,setLoading] = useState(false)
    const [forecast,setForecast] = useState([])
    const [desc,setDesc] = useState()
    const API_KEY = "43849a8cd56492150d4a8f4a3586b7d7"
    
    useEffect(()=>{
        search();
    },[])
    
    const WeatherIcon = {
        "01d":clearIcon,
        "02d":fewIcon,
        "03d":scatterdIcon,
        "04d":brokenIcon,
        "09d":rainIcon,
        "10d":rainIcon,
        "11d":thunderstormIcon,
        "13d":snowIcon,
        "01n":clearIcon,
        "02n":fewIcon,
        "03n":scatterdIcon,
        "04n":brokenIcon,
        "09n":rainIcon,
        "10n":rainIcon,
        "11n":thunderstormIcon,
        "13n":snowIcon,
    }


    const search = async () =>{
        setLoading(true)
        try {
            let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${API_KEY}&units=metric`
            let response = await fetch(url2)
            let data = await response.json()
            
            if(data.cod==="404"){
                setFound(true);
                setLoading(false)
                return
            }
            setForecast([data])
            console.log(data)
            setCity(data.city.name)
            setDate(data.list[0].dt_txt)
            setHumidity(data.list[0].main.humidity)
            setWind(data.list[0].wind.speed)
            setTemp(data.list[0].main.temp)
            const weatherCode = data.list[0].weather[0].icon
            setIcon(WeatherIcon[weatherCode])
            setDesc(data.list[0].weather[0].description)
            setFound(false);
            
        } catch (error) {
        setError(error)
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <div className='container'>
        {
            <div className='weather'>
                <form>
                    <input type="text" value={value} onChange={e=>setValue(e.target.value)} onKeyDown={(e)=>(e.key=="Enter"?search():"" )}/>
                    <button onClick={e=>
                    {
                    e.preventDefault()
                    search()
                    }} >
                        <MdOutlineSearch size={"25px"}/></button>
              </form>
              {
                !notFound && !loading &&
                (<div className='weather-details'>
                    <div className='city'>
                        <p className='cityName'>{city}</p>
                        <p>{date}</p>
                    </div>
                    <div className='wind'>
                        <div>
                            <WiHumidity size={50} />
                            <p>{Humidity}%</p>
                            <p>Humidity</p>
                        </div>
                        <div>
                            <GiWindsock size={50}/>
                            <p>{wind}mph</p>
                            <p>Wind</p>
                        </div>
                    </div>
                    <div>
                        <span className='vertical-line'></span>
                    </div>
                    <div className='icon'>
                        <img src={icon} className='weather-icon'/>
                        <div className="forecast">
                            <p>{temp}°C</p>
                            <p>{desc}</p>
                        </div>
                    </div>
                </div>)
              } 
                    {
                    loading && <div className='loading'>Loading....</div>
                    }
                    {
                    notFound && <div style={{textAlign:"center",color:'white',marginTop:'20px',fontSize:'20px'}}><p>City not found</p>
                <img src={erroeFound} width={"100px"} height={"100px"}  alt="" /></div>
                    }     
            </div>
        }
    </div>
  )
}

export default Weather