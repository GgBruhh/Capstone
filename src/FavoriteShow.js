import React from "react";
import {Link} from 'react-router-dom'
import "./AniCard.css"

function FavoriteShow(show){

  const {show_name, show_id, img_src} = show.show;
    console.log(show_name)

    //sends query to local API to remove the show from favorites list in psql db
    async function deleteShow(){
        try {
            const response = await fetch('http://localhost:5000/api/data', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "name": `"${show_name}"`
            }),
            });
          } catch (error) {
            console.error('Error adding data', error);
          }
    }

    return(
      <div className="ani-card-container">
      <div className="show-card">
          <Link to={`/show/${show_id}`}>
          <img src={img_src} alt={show_name} />
          </Link>
          <p>{show_name}</p>
          <button onClick={deleteShow}>Remove From Favorites</button>
      </div>
  </div>
    )
}


export default FavoriteShow;