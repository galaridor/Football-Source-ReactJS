import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css';

function Map({address, phone}) {
  const [position, setPosition] = useState([51.505, -0.09]);
  const zoom = 13;

  return (
    <div className={styles['map-section']}>
     <MapContainer center={[position[0], position[1]]} zoom={zoom} style={{ height: '500px', width: '100%' }} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
	   <Marker position={position}>
        <Popup>
          <strong>Adress:</strong> {address} 
		  <br></br>
		  <strong>Phone:</strong> {phone}
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
}

export default Map;