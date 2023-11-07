import axios from "axios";


const BASE_API_URL = 'https://graphql.anilist.co';

class AnilistApi {
    static async search(title) {
        const query = `
            query {
                Page(page:1, perPage: 10){
                    media(search: "${title}", type: ANIME) {
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
}

export default AnilistApi;