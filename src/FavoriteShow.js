import React from "react";

function FavoriteShow({name}){

    async function deleteShow(){
        try {
            const response = await fetch('http://localhost:5000/api/data', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "name": `"${name}"`
            }),
            });
          } catch (error) {
            console.error('Error adding data', error);
          }
    }
    console.log(name);
    return(
        <div>
            <p>{name}</p>
            <button onClick={deleteShow}>Remove From Favorites</button>
        </div>
    )
}


export default FavoriteShow;