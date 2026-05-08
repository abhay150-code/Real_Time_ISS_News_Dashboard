import axios from 'axios';

// ISS API (No auth required)
export const getISSPosition = async () => {
  try {
    const apiKey = import.meta.env.VITE_N2YO_API_KEY;
    const response = await axios.get(`/api/n2yo/rest/v1/satellite/positions/25544/18.5204/73.8567/0/2/&apiKey=${"6FHUEL-MJKRRZ-8SJK6Z-5QL4"}`);
    
    const position = response.data.positions[0];
    return {
      iss_position: {
        latitude: position.satlatitude,
        longitude: position.satlongitude
      },
      timestamp: position.timestamp
    };
  } catch (error) {
    console.error('N2YO API failed:', error);
    throw error;
  }
};

export const getAstronauts = async () => {
  const response = await axios.get('http://api.open-notify.org/astros.json');
  return response.data;
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
