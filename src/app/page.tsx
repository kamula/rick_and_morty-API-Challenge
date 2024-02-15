"use client"
import React, { useState, useEffect } from 'react';
import { fetchLocations } from './lib/data';
import LocationTable from './components/home/LocationTable';

interface Character {
  name: string;
}

interface Location {
  name: string;
  type: string;

}

export default function HomePage() {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [locationData, setLocationData] = useState<Location[]>([]);
  const [filteredData, setFilteredData] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Location[] = await fetchLocations();
      setLocationData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = searchTerm.toLowerCase().trim();
    const filtered = locationData.filter(location =>
      location.name.toLowerCase().includes(filterData) ||
      location.type.toLowerCase().includes(filterData)
    );
    setFilteredData(filtered);
  }, [searchTerm, locationData]);

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by location, character, or episode"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none rounded-md shadow-sm"
        />
      </div>
      <LocationTable data={filteredData} />
    </div>


  );
}
