import { useEffect } from "react";
import api from "../api/axios";

const Home = () => {
  useEffect(() => {
    api.get("/posts").then((res) => console.log(res.data));
  }, []);

  return <h2>Home Page is good.</h2>;
};

export default Home;
