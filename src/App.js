import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [link, setLink] = useState("google.de");
  const [ipInputEmpty, setIpInputEmpty] = useState(false);
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");

  const createLink = () => {
    setLink("www.hurrdurr.de/" + randomChar(8));
  };

  const randomChar = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const apiCall = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=2003:d0:973b:4a32:180:57c0:a603:2e27`
      )
      .then((response) => {
        let data = response.data;
        console.log(data);
        setIp(data.ip_address);
        setIpInputEmpty(true);
        setLocation(data.city);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getIpInfo = () => {
    // Link to an IP site
  };

  return (
    <div className="container">
      <h1>IP Grabber</h1>
      <div className="link--container">
        <span>Link</span>
        <input type="text" name="telnum" value={link} readOnly="readonly" />
        <button onClick={createLink}>Create link</button>
      </div>
      <div>
        <span>IP adress</span>
        <input
          className={ipInputEmpty ? "valid" : "error"}
          type="text"
          name="telnum"
          value={ip}
          readOnly="readonly"
        />
        <span>Location</span>
        <input
          className={ipInputEmpty ? "valid" : "error"}
          type="text"
          name="telnum"
          value={location}
          readOnly="readonly"
        />
        <button onClick={getIpInfo}>Get Info</button>
      </div>
      <button onClick={apiCall}>Get ip_address</button>
    </div>
  );
}

export default App;
