import {React, useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import AnilistApi from "./Api";


function ShowDescription(){

    const {id} = useParams();
    
    const [data, setData] = useState(null);
    const [favorites, setFavorites] = useState();

    useEffect(() => {
        // Define an asynchronous function inside useEffect to handle the data retrieval
        const fetchData = async () => {
            try {
                const result = await AnilistApi.searchId(id);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle errors if needed
            }
        };

        // Call the asynchronous function
        fetchData();
    }, [id]); // Ensure useEffect runs when 'id' changes

    function checkData() {
        if (data && data.data && data.data.Media) {
            const show = data.data.Media;
            return show;
        } else {
            return null; // Return null instead of undefined for consistency
        }
    }
    
    function checkTitle(showData) {
        if (showData && showData.title) {
            const { english, romaji } = showData.title;
    
            if (english) {
                return english;
            } else if (romaji) {
                return romaji;
            }
        }
    
        // Return a default value or handle the case when neither English nor Romaji title is available
        return "Title Not Available";
    }
    
    function checkImgSrc(showData) {
        if (showData && showData.coverImage && showData.coverImage.extraLarge) {
            const imgSrc = showData.coverImage.extraLarge;
            return imgSrc;
        }
    
        // Return a default value or handle incase there is no image route
        return "Image Not Available";
    }


    

    function checkDescription(showData) {
        if (showData && showData.description) {
            const description = showData.description;
            return description;
        }
    
        // Return a default value or handle incase there is no description defined.
        return "Description Not Available";
    }





    function checkId(showData){
        if (showData && showData.id){
            const showId = showData.id;
            return showId;
        }
        return "ID Not Available"
    }
    
    const showData = checkData();
    const title = checkTitle(showData);
    const imgSrc = checkImgSrc(showData);
    const description = checkDescription(showData);
    const showId = checkId(showData);

    // Your description with HTML tags
    const descriptionWithHtml = description;

    // Function to remove HTML tags
    function removeHtmlTags(htmlText) {
        const doc = new DOMParser().parseFromString(htmlText, 'text/html');
        return doc.body.textContent || "";
    }
    
    // Applying the function to the description
    const cleanedDescription = removeHtmlTags(descriptionWithHtml);
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/data');
            const result = await response.json();
            setFavorites(result);
            console.log(result);
          } catch (error) {
            console.error('Error fetching data', error);
          }
        };
    
        fetchData();
      }, []);


      function inFavorites(id) {
        try {
            if (favorites) {
                return favorites.some((favorite) => id == favorite.show_id);
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error checking favorites', error);
            return false;
        }
    }
    

    async function addToFavorites(){
        try {
            const response = await fetch('http://localhost:5000/api/data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "user_id": 1,
                "show_name": `"${title}"`,
                "show_id": `"${showId}"`,
                "img_src": `"${imgSrc}"`,
                "description": `"${cleanedDescription.replace(/\n/g, '')}"`
            }),
            });
      
            const addedData = await response.json();
            console.log('Data added:', addedData);
          } catch (error) {
            console.error('Error adding data', error);
          }
    }

    async function changeStatus(e){
        e.preventDefault()
        const selectedOption = document.getElementById('dropdown').value

        try {
            const response = await fetch('http://localhost:5000/api/status', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "show_name": `"${title}"`,
                "show_id": `"${showId}"`,
                "status": `${selectedOption}`
            }),
            });
      
            const addedData = await response.json();
            console.log('Data added:', addedData);
          } catch (error) {
            console.error('Error adding data', error);
          }
    }

    async function deleteShow(){
        try {
            const response = await fetch('http://localhost:5000/api/data', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "name": `"${title}"`
            }),
            });
          } catch (error) {
            console.error('Error adding data', error);
          }
    }
    
    return(
        <div>
            <h1>{title}</h1>
            <img src={imgSrc}/>
            {inFavorites(showId) ? (
            <button onClick={deleteShow}>Remove From Favorites</button>
                                    ) : (
            <button onClick={addToFavorites}>Add to favorites</button>
            )}
            <form onSubmit={changeStatus}>
                <select id="dropdown" name="dropdown">
                <option value="plan-to-watch">Plan To Watch</option>
                <option value="watched">Watched</option>
                </select>
                <button>Add to list</button>
            </form>
            
            <br/>
            <i>Description: {cleanedDescription}</i>
        </div>
    )
}


export default ShowDescription;