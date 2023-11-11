import React, { useState } from 'react';
import ShowCard from './ShowCard';
import './ShowList.css'

function ShowList(rawData){
    console.log(rawData.rawData)


    function refineData(rawData){
        if (rawData && rawData.rawData && 
            rawData.rawData.data && rawData.rawData.data.Page 
            && rawData.rawData.data.Page.media) {
            const data = rawData.rawData.data.Page.media;
            return data;
        } else {
            return undefined;
        }
    }

    const processedData = refineData(rawData)
    console.log(processedData)
    return (
        <div className='card-list'>
        <div className='show-list'>
            {processedData ? (
            processedData.map((show, index) => (
                <ShowCard key={index} show={show}/>
            ))
            ) : (
                <p></p>
            )}
        </div>
        </div>
    );
        }    



export default ShowList;