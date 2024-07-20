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

  const apiCall = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/get-ip");
      setIp(response.data.ip);
    } catch (error) {
      console.error("Error fetching the IP address:", error);
    }
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
        <span>IP address</span>
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
        <button>Get Info</button>
      </div>
      <button onClick={apiCall}>Get IP Address</button>
    </div>
  );
}

export default App;
