import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export function App() {
  // Desestruturação da API
  const [arrPosts, setArrPosts] = useState([]);

  useEffect(() => {
    const requisicaoAPI = async () => {
      const respostaAPI = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
      );

      setArrPosts(respostaAPI.data);
    };

  requisicaoAPI();    
  }, []);

  return (
    <ul>
      {arrPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
