import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Salon } from '@/integrations/supabase/types';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  salons: Salon[];
  center?: [number, number];
  zoom?: number;
}

const Map = ({ salons, center = [40.7128, -74.0060], zoom = 13 }: MapProps) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
      className="rounded-lg shadow-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {salons.map((salon) => (
        salon.latitude && salon.longitude ? (
          <Marker
            key={salon.id}
            position={[salon.latitude, salon.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{salon.name}</h3>
                <p className="text-sm text-gray-600">{salon.address}</p>
                <p className="text-sm">Rating: {salon.rating}/5</p>
              </div>
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
};

export default Map;