import { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";

const App = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDate();
  }, []);

  return (
    <div>
      <h1>Sanjoy</h1>
      <FileUpload />
    </div>
  );
};

export default App;
