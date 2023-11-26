import {React, useState, useEffect} from "react";
import AniCard from "./AniCard";

function Watched(){

  const [data, setData] = useState([]);

  useEffect(() => {
    //fetches shows that are in the watched list in psql database
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/status/watched');
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
      <h1>Watched Shows</h1>
      <ul>
        {data.map(item => (
            <AniCard key={item.id} shows={item} />
        ))}
      </ul>
    </div>
  );
}

export default Watched;