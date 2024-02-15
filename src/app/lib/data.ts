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


export async function fetchLocationDetails(id: number | string) {
    try {
        // Fetch the location details
        const { data: locationData } = await axios.get(`${BASE_URL}/location/${id}`);

        // Fetch each resident's details in parallel
        const residentPromises = locationData.residents.map((url: string) => axios.get(url));
        const residentResponses = await Promise.all(residentPromises);

        // Extract the relevant details from each resident
        const residentsDetails = residentResponses.map(response => {
            const { id, name, status, image } = response.data;
            return { id, name, status, image };
        });

        // Combine the location information with the detailed resident information
        const detailedLocationData = {
            ...locationData,
            residents: residentsDetails,
        };
        return detailedLocationData;

    } catch (error) {
        console.error("Error fetching location and residents with Axios:", error);
        throw error;
    }
}