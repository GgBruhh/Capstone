import {React, useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import AnilistApi from "./Api";


function ShowDescription(){

    const {id} = useParams();
    
    const [data, setData] = useState(null);

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
    
    // Print the cleaned description
    console.log(cleanedDescription);

    async function sendData(){
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
    
    return(
        <div>
            <h1>{title}</h1>
            <img src={imgSrc}/>
            <button onClick={sendData}>Add to favorites</button><br/>
            <i>Description: {cleanedDescription}</i>
        </div>
    )
}


export default ShowDescription;