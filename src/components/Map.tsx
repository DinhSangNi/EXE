/* eslint-disable */
import { getLatLngFromAddress } from "@/utils/googleMap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useRef } from "react";

type Props = {
    address?: string;
    onChange?: (location: Coordinates) => void;
    lat?: number;
    lng?: number;
    coordinates?: Coordinates[];
};

export type Coordinates = {
    lat: number;
    lng: number;
};

const quyNhonCoordinates = {
    lat: 13.782,
    lng: 109.2193,
};

const Map = ({ address, onChange, lat, lng, coordinates }: Props) => {
    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        if (coordinates) {
            if (coordinates.length === 1) {
                mapRef.current.panTo(coordinates[0]);
            } else {
                const bounds = new google.maps.LatLngBounds();
                coordinates.forEach((c) => bounds.extend(c));
                mapRef.current.fitBounds(bounds, 100);
            }
        }

        if (lat && lng) mapRef.current.panTo({ lat, lng });

        if (address) {
            (async () => {
                const res = await getLatLngFromAddress(address);
                if (res) {
                    mapRef.current!.panTo(res.location);
                    onChange?.(res.location);
                }
            })();
        }
    }, [coordinates, lat, lng, address]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={coordinates?.[0] ?? quyNhonCoordinates}
                zoom={12}
                onLoad={onLoad}
            >
                {/* {(coordinates ?? []).map((c, i) => (
                    <Marker key={`${c.lat}-${c.lng}-${i}`} position={c} />
                ))} */}
                {coordinates?.[0] && <Marker position={coordinates?.[0]} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
