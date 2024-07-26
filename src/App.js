import './App.css';
import { createTheme, ThemeProvider } from "@mui/material";
import HomePage from './home';
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TimePropContext, ApiCityName } from "./context/TimingContext";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
let cancelAxios = null;
function App() {
  const [timings, setTimings] = useState({});
  const [apiCity, setApiCity] = useState("dhofar");
   useEffect(() => {
     axios
       .get(
         `https://api.aladhan.com/v1/timingsByCity?country=OM&city=${apiCity}`,
         {
           cancelToken: new axios.CancelToken((c) => {
             cancelAxios = c;
           }),
         }
       )
       .then(function (response) {
         // handle success
         const Asr = response.data.data.timings.Asr;
         const dohar = response.data.data.timings.Dhuhr;
         const Fajr = response.data.data.timings.Fajr;
         const Isha = response.data.data.timings.Isha;
         const Maghrib = response.data.data.timings.Maghrib;
         setTimings({ Asr, dohar, Fajr, Isha, Maghrib });
       })
       .catch(function (error) {
         // handle error
         console.log(error);
       });

     return () => {
       cancelAxios();
     };
   }, [apiCity]);
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TimePropContext.Provider value={{ timings, setTimings }}>
          <ApiCityName.Provider value={{ apiCity, setApiCity }}>
            <HomePage />
          </ApiCityName.Provider>
        </TimePropContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;

