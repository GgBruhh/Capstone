import React from 'react';
import './ShowCard.css'

function ShowCard(show){

    function checkTitle(show){

        if(show.show.title.english){
            const title = show.show.title.english;
            return title;
        }else{
            const title = show.show.title.romaji
            return title;
        }
    }
    const imgSrc = show.show.coverImage.extraLarge
    console.log(show)
    const title = checkTitle(show)
    console.log(title)
    return(
        <div className='show-card'>
            <a className='card-a'>
            <img src={imgSrc} className='card-img' />
            </a>
            
            <p>{title}</p>

        </div>
    )
}


export default ShowCard;