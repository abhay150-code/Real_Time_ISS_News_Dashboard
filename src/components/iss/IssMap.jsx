import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../../store/useStore';
import 'leaflet/dist/leaflet.css';

// Fix leafet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom glowing icon for ISS
const issIcon = new L.DivIcon({
  html: `<div class="relative flex h-6 w-6 items-center justify-center">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-brand-500 border-2 border-white"></span>
         </div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Component to recenter map smoothly
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.flyTo([lat, lon], map.getZoom(), {
        animate: true,
        duration: 1.5
      });
    }
  }, [lat, lon, map]);
  return null;
};

const IssMap = () => {
  const { issData, issHistory } = useStore();

  if (!issData) {
    return <div className="h-full w-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl"><p className="text-slate-400">Loading Map...</p></div>;
  }

  const path = issHistory.map(pos => [pos.lat, pos.lon]);

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl relative z-0">
      <MapContainer 
        center={[issData.lat, issData.lon]} 
        zoom={3} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />
        
        {path.length > 1 && (
          <Polyline positions={path} color="#3b82f6" weight={3} dashArray="5, 10" opacity={0.6} />
        )}
        
        <Marker position={[issData.lat, issData.lon]} icon={issIcon}>
          <Popup className="glass-dark border-none text-white font-sans">
            <strong>ISS Current Location</strong><br/>
            Lat: {issData.lat.toFixed(4)}<br/>
            Lon: {issData.lon.toFixed(4)}
          </Popup>
        </Marker>
        
        <RecenterMap lat={issData.lat} lon={issData.lon} />
      </MapContainer>
    </div>
  );
};

export default IssMap;
