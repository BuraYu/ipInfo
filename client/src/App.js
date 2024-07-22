import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTypewriter, Cursor } from "react-simple-typewriter";

function App() {
  const [status, setStatus] = useState("");
  const [timezone, setTimezone] = useState("");
  const [region, setRegion] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [currency, setCurrency] = useState("");
  const [geoLocation, setGeoLocation] = useState("");
  const [ip, setIp] = useState("");

  const [text] = useTypewriter({
    words: ["Hello", "timezone", "region", "mobile"],
    loop: false,
    onLoopDone: () => console.log(`loop completed after 3 runs.`),
    typeSpeed: 300,
    delaySpeed: 1000,
  });

  //ip-api 45 uses per minute, throttle after
  const apiCall = async () => {
    try {
      const response = await axios.get(
        "http://ip-api.com/json/2003:D0:973B:4A58:EC2A:9304:1C29:FEED?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query"
      );
      const data = response.data;
      setStatus(data.status);
      setTimezone(data.timezone);
      setRegion(data.region);
      setMobile(data.mobile);
      setCity(data.city);
      setCountry(data.country);
      setCurrency(data.currency);
      setContinent(data.continent);
      setGeoLocation(`Latitude: ${data.lat} Longtitude: ${data.lon}`);
      setIp(data.geoLocation);
      setIp(data.query);
    } catch (error) {
      console.error("Error fetching the client info:", error);
    }
  };

  useEffect(() => {
    apiCall();
    console.log("called once!");
  }, []);

  return (
    // <div className="container">
    //   <div>
    //     <input
    //       className={"valid"}
    //       type="text"
    //       name="telnum"
    //       value={status}
    //       readOnly="readonly"
    //     />
    //     <span>Timezone</span>
    //     <input
    //       className={"valid"}
    //       type="text"
    //       name="telnum"
    //       value={timezone}
    //       readOnly="readonly"
    //     />
    //     <span>City</span>
    //     <input
    //       className={"valid"}
    //       type="text"
    //       name="telnum"
    //       value={city}
    //       readOnly="readonly"
    //     />
    //     <span>Mobile Device</span>
    //     <input
    //       className={"valid"}
    //       type="text"
    //       name="telnum"
    //       value={mobile}
    //       readOnly="readonly"
    //     />
    //     <span>Country</span>
    //     <input
    //       className={"valid"}
    //       type="text"
    //       name="telnum"
    //       value={country}
    //       readOnly="readonly"
    //     />
    //     <span>Paying in</span>
    //     <input
    //       className={"valid"}
    //       type="text"
    //       name="telnum"
    //       value={currency}
    //       readOnly="readonly"
    //     />
    //     <span>Geo Location</span>
    //     <input
    //       className={"valid"}
    //       type="text"
    //       name="telnum"
    //       value={geoLocation}
    //       readOnly="readonly"
    //     />
    //     <span>Continent</span>
    //     <input
    //       className={"valid"}
    //       type="text"
    //       name="telnum"
    //       value={continent}
    //       readOnly="readonly"
    //     />
    //     <span>Ip Adress</span>
    //     <input
    //       className={"valid"}
    //       type="text"
    //       name="telnum"
    //       value={ip}
    //       readOnly="readonly"
    //     />
    //     <button onClick={apiCall2}>Get Client Info</button>
    //   </div>

    // </div>
    <div className="test">
      <span>{text}</span>
      <Cursor cursorColor="#20C20E" />
    </div>
  );
}

export default App;
