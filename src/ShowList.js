import React from 'react';
import ShowCard from './ShowCard';
import Search from './Search';

function ShowList(rawData){
    console.log(rawData.rawData)
    return(
        <div>
            <h1>Welcome!</h1>
        </div>
    )

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
    
    
}


export default ShowList;