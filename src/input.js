import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState, useEffect, useContext } from "react";
import { ApiCityName } from "./context/TimingContext";

export default function BasicSelect({ setNamecityFromChild }) {
  const [ country, setCountry ] = useState("dhofar");
  const { apiCity, setApiCity } = useContext(ApiCityName)

  const cityObject = [
    {
      diplayName: "ظفار",
      apiName: "dhofar",
    },
    {
      diplayName: "البريمي",
      apiName: "Al Buraymī",
    },
    {
      diplayName: "مسقط",
      apiName: "Masqaţ",
    },
  ];

 const handleCityChange = (event) => {
    const selectedApiName = event.target.value;
    console.log(selectedApiName)
    setCountry(selectedApiName); // Update state with selected city API name
    setApiCity(selectedApiName);
    
    // Find the city object with the selected API name
    const selectedCity = cityObject.find((city) => city.apiName === selectedApiName);
    if (selectedCity) {
      setNamecityFromChild(selectedCity.diplayName); // Pass display name to parent component
    }
  };
    
  

  return (
    <Box sx={{ minWidth: 120, marginTop: "30px" }}>
      <FormControl fullWidth sx={{ textAlign: "end" }}>
        <InputLabel id="demo-simple-select-label" sx={{ color: "#fff" }}>
          المدينة
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="المدينة"
          onChange={handleCityChange}
          sx={{ color: "#fff" }}
        >
          {cityObject.map((city) => {
            return (
              <MenuItem key={city.apiName} value={city.apiName}>
                {city.diplayName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );

};