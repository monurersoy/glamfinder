import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { type Salon } from '@/integrations/supabase/types/salon';

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

const Map = ({ salons, center = [40.7589, -73.9851], zoom = 13 }: MapProps) => {
  return (
    <div style={{ height: '400px', width: '100%' }} className="rounded-lg shadow-md">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {salons.map((salon) => (
          salon.latitude && salon.longitude ? (
            <Marker
              key={salon.id}
              position={[salon.latitude, salon.longitude] as L.LatLngExpression}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{salon.name}</h3>
                  <p className="text-sm text-gray-600">{salon.address}</p>
                  <p className="text-sm">Rating: {salon.rating?.toFixed(1) || 'N/A'}</p>
                </div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;