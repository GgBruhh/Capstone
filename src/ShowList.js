import React from 'react';
import ShowCard from './ShowCard';
import './ShowList.css'

function ShowList(rawData){
    console.log(rawData.rawData)

    function refineData(rawData){
        if (rawData && rawData.rawData && rawData.rawData.data && rawData.rawData.data.Page && rawData.rawData.data.Page.media) {
            const data = rawData.rawData.data.Page.media;
            return data;
        } else {
            return undefined;
        }
    }

    const processedData = refineData(rawData)
    console.log(processedData)
    return (
        <div className='show-list'>
            {processedData ? (
            processedData.map((show, index) => (
                <ShowCard key={index} show={show} />
            ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
        }

    //checks if there is any data to be processed, if so it will refine it, if not it will not refine anything.
    // if(rawData.rawData.length > 0){
    //     const data = rawData.rawData.data.Page.media;
    //     console.log(data)
    //     return(
    //         <div className='show-list'>
    //             <h1>Welcome!</h1>
    //             {data.forEach(show => {
    //                 return <ShowCard show={show}/>
    //             })}
    //         </div>
    //     )
    // }else{
    //     return(
    //         <Search />
    //     )
    // }
    
    



export default ShowList;