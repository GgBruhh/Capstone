import React, { useState } from "react";
import AnilistApi from "./Api";
import ShowList from "./ShowList";

function Search(){
    const INITIAL_STATE= [];

    const [formData, setFormData] = useState([]);
    const [searchData, setSearchData] = useState(INITIAL_STATE);
    

    const handleChange = (e) => {
        setFormData({ search: e.target.value });
    }


    async function handleSubmit(e){
        e.preventDefault();
        console.log(formData);
        const title = `${formData.search}`;
        const result = await AnilistApi.searchTitle(title);
        console.log(result)
        
        setSearchData(result)
        return result;
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search"> Search for a title: </label>
                <input 
                placeholder="Title" 
                name="search" 
                className="search"
                onChange={handleChange}>
                    </input>
                <button>Search</button>
            </form>
            <ShowList rawData={searchData}/>
        </div>
    )
}

export default Search;