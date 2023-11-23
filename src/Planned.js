import {React, useState, useEffect} from "react";
import FavoriteShow from "./FavoriteShow";
import AniCard from "./AniCard";

function Planned(){

    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/status/plan-to-watch');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs once on mount

  return (
    <div>
      <h1>Planned to watch</h1>
      <ul>
        {data.map(item => (
            <AniCard key={item.id} shows={item} />
        ))}
      </ul>
    </div>
  );
}

export default Planned;