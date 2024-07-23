import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTypewriter, Cursor } from "react-simple-typewriter";

function App() {
  const [clientData, setClientData] = useState({
    status: "",
    mobile: false,
    city: "",
    country: "",
    currency: "",
    geoLocation: "",
    ip: "",
  });

  //ip-api 45 uses per minute, throttle after
  const apiCall = async () => {
    try {
      const { data } = await axios.get(
        "http://ip-api.com/json/2003:D0:973B:4A58:EC2A:9304:1C29:FEED?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query"
      );
      const { status, mobile, city, country, currency, lat, lon, query } = data;
      setClientData({
        status,
        mobile,
        city,
        country,
        currency,
        geoLocation: `Latitude ${lat} Longitude: ${lon}`,
        ip: query,
      });
      console.log(data);
    } catch (error) {
      console.error("Error fetching the client info:", error);
    }
  };

  useEffect(() => {
    apiCall();
    console.log("called once!");
  }, []);

  const apiCallData = [
    "Hello",
    "you shouldn't have clicked on the link...",
    `This was a ${clientData.status}`,
    clientData.mobile
      ? "So you use your cellphone"
      : "Not using your cellphone, I see",
    `${clientData.country} is a nice country.`,
    `You are from ${clientData.city}, right?`,
    `Maybe you can send me some ${clientData.currency}?`,
    `Since I have your exact location ${clientData.geoLocation}`,
    `and your IP address ${clientData.ip}`,
    "clicking the link was a big mistake....",
  ];

  const [text] = useTypewriter({
    words: [
      apiCallData[0],
      apiCallData[1],
      apiCallData[2],
      apiCallData[3],
      apiCallData[4],
      apiCallData[5],
      apiCallData[6],
      apiCallData[7],
      apiCallData[8],
      apiCallData[9],
    ],
    loop: false,
    typeSpeed: 100,
    delaySpeed: 1000,
  });

  return (
    <div className="test">
      <span>{text}</span>
      <Cursor cursorColor="#20C20E" />
    </div>
  );
}

export default App;
