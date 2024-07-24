import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function App() {
  const [clientData, setClientData] = useState({
    status: "",
    mobile: false,
    city: "",
    country: "",
    currency: "",
    geoLocation: "",
    ip: "",
    lon: 0,
    lat: 0,
  });

  const url =
    "http://ip-api.com/json/2003:D0:973B:4A58:EC2A:9304:1C29:FEED?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query";
  const [apiCallData, setApiCallData] = useState([]);

  //ip-api 45 uses per minute, throttle after
  const apiCall = async () => {
    try {
      const { data } = await axios.get(url);
      const { status, mobile, city, country, currency, lat, lon, query } = data;
      setClientData({
        status,
        mobile,
        city,
        country,
        currency,
        geoLocation: `Latitude ${lat} Longitude: ${lon}`,
        lon,
        lat,
        ip: query,
      });
      console.log(data);
    } catch (error) {
      console.error("Error fetching the client info:", error);
    }
  };

  useEffect(() => {
    apiCall();
    setApiCallData([
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
    ]);
  }, []);

  const position = [clientData.lat, clientData.lon];

  const [text] = useTypewriter({
    words: apiCallData,
    loop: false,
    typeSpeed: 100,
    delaySpeed: 1000,
  });

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  const RecenterMap = ({ lat, lon }) => {
    const map = useMap();
    useEffect(() => {
      if (lat && lon) {
        map.setView([lat, lon], 13);
      }
    }, [lat, lon]);
    return null;
  };

  return (
    <div className="test">
      <span>{text}</span>
      <Cursor cursorColor="#20C20E" />
      <div className="info">
        <span>{clientData.city}</span>
        <span>{clientData.status}</span>
        <span>{clientData.country}</span>
        <span>{clientData.currency}</span>
        <span>{clientData.ip}</span>
        <MapContainer
          center={position}
          zoom={2}
          style={{ height: "500px", width: "500px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CircleMarker
            center={[clientData.lat, clientData.lon]}
            radius={100}
            fillColor="red"
            color="red"
            fillOpacity={0.5}
          />{" "}
          <RecenterMap lat={clientData.lat} lon={clientData.lon} />
        </MapContainer>
      </div>
    </div>
  );
}
export default App;
