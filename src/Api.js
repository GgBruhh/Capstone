import axios from "axios";


const BASE_API_URL = 'https://graphql.anilist.co';


//Api to handle queries to the external API
class AnilistApi {
    //Search Funciton from user input
    static async searchTitle(title) {
        const query = `
            query {
                Page(page:1, perPage: 10){
                    media(search: "${title}", type: ANIME, isAdult: false) {
                        id
                        title {
                            english
                            native
                            romaji
                        }
                        description
                        episodes
                        status
                        coverImage {
                            extraLarge
                        }
                        genres
                        averageScore
                        isAdult
                    }
                }
            }
        `;

        const url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                })
            };

        try {
            const response = await fetch(url, options);
            const data = await handleResponse(response);
            return handleData(data); // Return the data from handleData
        } catch (error) {
            handleError(error);
            return null; // Return null or handle the error appropriately
        }

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        function handleData(data) {
            console.log(data);
            return data; // Return the data
        }

        function handleError(error) {
            alert('Error, check console');
            console.error(error);
        }
    }

    //Searches for ID of input show to return show details for the 'ShowDescription' component
    static async searchId(id) {
        const query = `
            query {
                    Media(id: ${id}, type: ANIME) {
                        id
                        title {
                            english
                            native
                            romaji
                        }
                        description
                        episodes
                        status
                        coverImage {
                            extraLarge
                        }
                        genres
                        averageScore
                        isAdult
                    }
                }
        `;

        const url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                })
            };

        try {
            const response = await fetch(url, options);
            const data = await handleResponse(response);
            return handleData(data); // Return the data from handleData
        } catch (error) {
            handleError(error);
            return null; // Return null or handle the error appropriately
        }

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        function handleData(data) {
            return data; // Return the data
        }

        function handleError(error) {
            alert('Error, check console');
            console.error(error);
        }
    }

    //Queries top 100 trending shows at the time to render on the homepage
    static async trending() {
        const query = `
        query {
            Page(page: 1, perPage: 100) {
              media(sort: TRENDING_DESC, type: ANIME) {
                coverImage{
                    extraLarge
                }
                id
                title {
                  english
                  romaji
                  native
                }
                popularity
                trending
              }
            }
          }
        `;

        const url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                })
            };

        try {
            const response = await fetch(url, options);
            const data = await handleResponse(response);
            return handleData(data); // Return the data from handleData
        } catch (error) {
            handleError(error);
            return null; // Return null or handle the error appropriately
        }

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        function handleData(data) {
            return data; // Return the data
        }

        function handleError(error) {
            alert('Error, check console');
            console.error(error);
        }
    }



}

export default AnilistApi;