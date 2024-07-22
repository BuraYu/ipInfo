import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [link, setLink] = useState("google.de");
  const [ipInput, setIpInput] = useState(false);
  const [ip, setIp] = useState("");
  const [browser, setBrowser] = useState("");
  const [os, setOs] = useState("");
  const [device, setDevice] = useState("");
  const [language, setLanguage] = useState("");
  const [referrer, setReferrer] = useState("");

  const createLink = () => {
    setLink("https://ip-info-client.vercel.app/" + randomChar(8));
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
      const response = await axios.get(
        "https://ip-info-server.vercel.app/api/get-info"
      );
      const data = response.data;
      setIp(data.ip);
      setBrowser(`${data.browser.name} ${data.browser.version}`);
      setOs(OsConverter(data.os.name, data.os.version));
      setDevice(data.device.type || "Unknown");
      setLanguage(data.language);
      setReferrer(data.referrer);
      setIpInput(true);
    } catch (error) {
      console.error("Error fetching the client info:", error);
    }
  };

  const apiCall2 = async () => {
    try {
      const response = await axios.get(
        "http://ip-api.com/json/2003:D0:973B:4A58:EC2A:9304:1C29:FEED?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query"
      );
      const data2 = response.data;
      console.log(data2);
    } catch (error) {
      console.error("Error fetching the client info:", error);
    }
  };

  const OsConverter = (nameOs, version) => {
    console.log(nameOs);
    console.log(version);
    if (version === "NT 10.0") {
      return "Windows 10";
    } else if (version === "NT 11.0") {
      return "Windows 11";
    } else return nameOs + version;
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
          className={ipInput ? "valid" : "error"}
          type="text"
          name="telnum"
          value={ip}
          readOnly="readonly"
        />
        <span>Browser</span>
        <input
          className={ipInput ? "valid" : "error"}
          type="text"
          name="telnum"
          value={browser}
          readOnly="readonly"
        />
        <span>OS</span>
        <input
          className={ipInput ? "valid" : "error"}
          type="text"
          name="telnum"
          value={os}
          readOnly="readonly"
        />
        <span>Device</span>
        <input
          className={ipInput ? "valid" : "error"}
          type="text"
          name="telnum"
          value={device}
          readOnly="readonly"
        />
        <span>Language</span>
        <input
          className={ipInput ? "valid" : "error"}
          type="text"
          name="telnum"
          value={language}
          readOnly="readonly"
        />
        <span>Referrer</span>
        <input
          className={ipInput ? "valid" : "error"}
          type="text"
          name="telnum"
          value={referrer}
          readOnly="readonly"
        />
        <button onClick={apiCall}>Get Client Info</button>
        <button onClick={apiCall2}>Get Client Info</button>
      </div>
    </div>
  );
}

export default App;
