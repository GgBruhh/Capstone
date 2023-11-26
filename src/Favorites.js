import React, { useState, useEffect } from "react";
import FavoriteShow from "./FavoriteShow";
import AniCard from "./AniCard";

function Favorites() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs once on mount

}

  return (
    <div>
      <h1>Favorites</h1>
        {data.map(item => (
            <FavoriteShow key={item.show_id} show={item}/>
        ))}
        
    </div>
  );
}

export default Favorites;
