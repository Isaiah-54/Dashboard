import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
})

export default function NodeMap({ points }: { points: { lat: number; lng: number; city?: string; country?: string; region?: string }[] }) {
  return (
    <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} className="leaflet-container">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p, i) => (
        <Marker key={i} position={[p.lat, p.lng]} icon={icon}>
          <Tooltip>
            <div className="text-xs">
              {p.city ? `${p.city}, ` : ''}{p.country ?? p.region ?? 'Unknown'}
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
