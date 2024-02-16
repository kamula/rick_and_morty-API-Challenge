import axios from 'axios';
import { createClient } from '@vercel/postgres';


const BASE_URL = 'https://rickandmortyapi.com/api';


interface Location {
    id: string;
    name: string;
    type: string;
    residents: string[];
}

interface Resident {
    name: string;
    status: string;
}

interface LocationWithResidents {
    id: string;
    name: string;
    type: string;
    residents: Resident[];
}

export async function fetchLocations(): Promise<LocationWithResidents[]> {
    try {
        const { data: { results: locations } } = await axios.get<{ results: Location[] }>(`${BASE_URL}/location`);

        const locationsWithResidents: LocationWithResidents[] = await Promise.all(
            locations.map(async (location): Promise<LocationWithResidents> => {
                const residents: Resident[] = await Promise.all(
                    location.residents.map(async (residentURL): Promise<Resident> => {
                        const { data: residentData } = await axios.get<Resident>(residentURL);
                        return {
                            name: residentData.name,
                            status: residentData.status,
                        };
                    })
                );

                return {
                    id: location.id,
                    name: location.name,
                    type: location.type,
                    residents,
                };
            })
        );

        return locationsWithResidents;
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


export async function fetchCharacterDetails(id: number | string) {
    // Function to fetch single character details 
    try {

        const { data: characterData } = await axios.get(`${BASE_URL}/character/${id}`);

        return characterData;
    } catch (error) {
        console.error("Error fetching character details with Axios:", error);
        throw error;
    }
}


