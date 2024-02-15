import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchLocations() {
    /*
        function to retrieve a list of locations (name and type), 
        along with the residents of that location and their status.
    */
    try {
        const { data: locationsData } = await axios.get(`${BASE_URL}/location`);
        return locationsData.results

    } catch (error) {
        console.error("Error fetching locations and residents with Axios:", error);
        throw error;
    }

}