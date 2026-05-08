import axios from 'axios';

// ISS Position API - Free, HTTPS, no API key needed
// https://wheretheiss.at/w/developer
export const getISSPosition = async () => {
  try {
    const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
    
    return {
      iss_position: {
        latitude: response.data.latitude,
        longitude: response.data.longitude
      },
      timestamp: response.data.timestamp
    };
  } catch (error) {
    console.error('Where The ISS At API failed:', error);
    throw error;
  }
};

// Astronauts API - Free, HTTPS, no API key needed
export const getAstronauts = async () => {
  const response = await axios.get('https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json');
  return {
    people: response.data.people.map(person => ({
      name: person.name,
      craft: person.iss ? 'ISS' : person.spacecraft
    }))
  };
};

// Reverse Geocoding (Free BigDataCloud API)
export const getNearestLocation = async (lat, lon) => {
  try {
    const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    return response.data.city || response.data.countryName || 'Ocean / Unknown';
  } catch (error) {
    return 'Unknown';
  }
};
