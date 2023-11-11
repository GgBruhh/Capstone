import React from "react";
import Search from "./Search";
import Trending from "./Trending";

function Homepage(){
    return(
        <div>
            <Search />
            <h1>Homepage!</h1>
            <Trending />
        </div>
    )
}

export default Homepage;