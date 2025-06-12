import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import '../pages/Dashboard.css';

export default function MapSection({ darkMode }) {
  return (
    <div className="map-container">
      <h3>Гео-активность</h3>
      <div className="map-wrapper">
        <MapContainer center={[55.75, 37.57]} zoom={3} scrollWheelZoom={false}>
          <TileLayer
            url={darkMode 
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
          />
          <Marker position={[55.75, 37.57]} />
          <Marker position={[51.51, -0.13]} />
        </MapContainer>
      </div>
    </div>
  )
}
