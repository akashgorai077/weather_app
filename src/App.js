import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import clearD from "./Images/clearD.png";
import clearN from "./Images/clearN.png";
import mix from "./Images/mix.png";
import mixN from "./Images/mixN.png";
import cloudy from "./Images/cloudy.png";
import dcloud from "./Images/dcloud.png";
import rainy from "./Images/rainy.png";
import drizzel from "./Images/drizzel.png";
import drizzelN from "./Images/drizzelN.png";
import storm from "./Images/storm.png";
import snow from "./Images/snow.png";
import mist from "./Images/mist.png";
import wind from "./Images/wind.png";
import humid from "./Images/humid.png";

function App() {
  const inputRef = useRef();
  const [weatherData, setweatherData] = useState(false);
  const dayIcon = {
    "01d": clearD,
    "02d": mix,
    "03d": cloudy,
    "04d": dcloud,
    "09d": rainy,
    "10d": drizzel,
    "11d": storm,
    "13d": snow,
    "50d": mist,
  };
  const nightIcon = {
    "01n": clearN,
    "02n": mixN,
    "03n": cloudy,
    "04n": dcloud,
    "09n": rainy,
    "10n": drizzelN,
    "11n": storm,
    "13n": snow,
    "50n": mist,
  };
  const search = async (city) => {
    if (city === "") {
      alert("City Not Found");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icons =
        dayIcon[data.weather[0].icon] || nightIcon[data.weather[0].icon];
      console.log(data);
      setweatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icons,
        type: data.weather[0].description
      });
    } catch (error) {
      setweatherData(false);
      console.error("error in fetching the data");
    }
  };

  useEffect(() => {
    search("Jamshedpur");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault()
   search(inputRef.current.value)
  };
  return (
    <div className="bg-gradient-to-r from-blue-200 to-cyan-200  h-screen flex justify-center pb-40  ">
      <div className=" border-2 border-teal-900 rounded-xl w-80 my-auto bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center  ">
        <div className="">
          <br />

          {/* SearchBox */}
          <form onSubmit={handleSubmit} >
          <div className="  bg-slate-400 flex justify-end rounded-full">
            <input
              className=" rounded-full w-64 h-10 border-2 border-teal-900 bg-gradient-to-r from-blue-200 to-cyan-200 text-l pl-3" ref={inputRef} type="text" placeholder="Enter city name"
            />
            <button type="submit" 
            // onClick={handleSubmit}
             className="cursor-pointer absolute pr-3 pt-3 " >
              <FaSearch />
            </button>
          </div>
          </form>
           
           {/* Image */}
          <div className=" flex justify-center mt-7 mb-5 ">
            <img className="flex" src={weatherData.icon} alt="cloud" />
          </div>

          {/* Location */}
          <div className=" flex flex-col items-center  ">
            <p className="text-6xl flex">
              {weatherData.temperature} <p className="text-3xl pt-3">°C</p>
            </p>
            <p className="text-2xl font-mono">{weatherData.location}  </p>
            <p>{weatherData.type}</p>
          </div>

          {/* wind & humid  */}
          <hr className="mt-5 " />
          <div className="flex justify-between mt-5 mb-5 font-mono">
            <div className="flex-col  ">
              <p className="flex">
              
                {weatherData.humidity}%
                <img className="size-6 ml-2 " src={humid} alt="" />
              </p>
              <p>Humidity</p>
            </div>

            <div className="flex-col ">
              {" "}
              <p className="flex">
                {" "}
                {weatherData.windspeed}Km/hr{" "}
                <img className="size-6 ml-2" src={wind} alt="" />
              </p>
              <p className="flex justify-center">Windspeed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;




// return (
//     <div className="bg-gradient-to-r from-blue-200 to-cyan-200  h-screen flex justify-center pb-40  ">
//       <div className=" border-2 border-teal-900 rounded-xl w-80  my-auto bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center  ">
//         <div className="">
//           <br />

//           {/* SearchBox */}
//           <div className="  bg-slate-400 flex justify-end rounded-full">
//             <input
//               className=" rounded-full w-64 h-10 border-2 border-teal-900 bg-gradient-to-r from-blue-200 to-cyan-200 text-l pl-3" ref={inputRef} type="text" placeholder="Enter city name"
//             />
//             <button type="submit" 
//             onClick={handleSubmit}
//              className="cursor-pointer absolute pr-3 pt-3 " >
//               <FaSearch />
//             </button>
//           </div>
           
//            {/* Image */}
//           <div className=" flex justify-center mt-7 mb-5 ">
//             <img className="flex" src={weatherData.icon} alt="cloud" />
//           </div>

//           {/* Location */}
//           <div className=" flex flex-col items-center  ">
//             <p className="text-6xl flex">
//               {weatherData.temperature} <p className="text-3xl pt-3">°C</p>
//             </p>
//             <p className="text-2xl font-mono">{weatherData.location}  </p>
//             <p>{weatherData.type}</p>
//           </div>

//           {/* wind & humid  */}
//           <hr className="mt-5 " />
//           <div className="flex justify-between mt-5 mb-5 font-mono">
//             <div className="flex-col  ">
//               <p className="flex">
              
//                 {weatherData.humidity}%
//                 <img className="size-6 ml-2 " src={humid} alt="" />
//               </p>
//               <p>Humidity</p>
//             </div>

//             <div className="flex-col ">
//               {" "}
//               <p className="flex">
//                 {" "}
//                 {weatherData.windspeed}Km/hr{" "}
//                 <img className="size-6 ml-2" src={wind} alt="" />
//               </p>
//               <p className="flex justify-center">Windspeed</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
