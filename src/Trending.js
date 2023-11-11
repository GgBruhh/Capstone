import {React, useState, useEffect} from "react";
import AnilistApi from "./Api";
import ShowCard from "./ShowCard";

function Trending(){

    const [trendingShows, setTrendingShows] = useState([]);

    useEffect(() => {
        // Define an asynchronous function inside useEffect to handle the data retrieval
        const fetchData = async () => {
            try {
                const result = await AnilistApi.trending();
                console.log(result)
                setTrendingShows(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle errors if needed
            }
        };

        // Call the asynchronous function
        fetchData();
    }, [])

    console.log(trendingShows);


    function checkData(){
        if(trendingShows && trendingShows.data && 
            trendingShows.data.Page && trendingShows.data.Page.media){
            const show = trendingShows.data.Page.media;
            return show;
        }else{
            return null
        }
    }

    const show = checkData()

    


    return(
        <div>
            <h1>Trending Shows</h1>
            {show ? (
            show.map((show, index) => (
                <ShowCard key={index} show={show}/>
            ))
            ) : (
                <p></p>
            )}
        </div>
    )
}

export default Trending;