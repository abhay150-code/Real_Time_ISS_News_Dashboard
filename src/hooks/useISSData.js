import { useEffect, useRef } from 'react';
import useStore from '../store/useStore';
import { getISSPosition, getAstronauts, getNearestLocation } from '../services/iss';
import { calculateSpeed } from '../utils/helpers';
import toast from 'react-hot-toast';

export const useISSData = () => {
  const { addIssPosition, setAstronauts, issData } = useStore();
  const lastUpdateRef = useRef(null);

  const fetchISSData = async () => {
    try {
      const posData = await getISSPosition();
      const lat = parseFloat(posData.iss_position.latitude);
      const lon = parseFloat(posData.iss_position.longitude);
      const timestamp = posData.timestamp * 1000;
      
      let speed = 0;
      if (lastUpdateRef.current) {
        speed = calculateSpeed(
          lastUpdateRef.current.lat, 
          lastUpdateRef.current.lon, 
          lastUpdateRef.current.timestamp, 
          lat, 
          lon, 
          timestamp
        );
      }
      
      lastUpdateRef.current = { lat, lon, timestamp };
      
      const locationName = await getNearestLocation(lat, lon);
      
      addIssPosition({ lat, lon, locationName, timestamp }, speed || 27600); // 27600 is approx speed if first load
    } catch (error) {
      console.error('Error in fetchISSData:', error);
      toast.error('Failed to update ISS position: ' + (error.message || 'Unknown error'));
    }
  };

  const fetchAstronautsData = async () => {
    try {
      const astros = await getAstronauts();
      setAstronauts(astros.people.filter(p => p.craft === 'ISS'));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchISSData();
    fetchAstronautsData();
    
    const interval = setInterval(fetchISSData, 15000);
    return () => clearInterval(interval);
  }, []);

  return { refresh: fetchISSData };
};
