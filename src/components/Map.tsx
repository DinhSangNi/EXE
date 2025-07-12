/* eslint-disable */
import { getLatLngFromAddress } from "@/utils/googleMap";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

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

const quyNhonCoordinates: Coordinates = {
    lat: 13.782,
    lng: 109.2193,
};

const Map = ({ address, onChange, lat, lng, coordinates }: Props) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const mapRef = useRef<google.maps.Map | null>(null);
    const [addressLocation, setAddressLocation] = useState<Coordinates | null>(
        null
    );

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        if (coordinates?.length) {
            if (coordinates.length === 1) {
                mapRef.current.panTo(coordinates[0]);
            } else {
                const bounds = new google.maps.LatLngBounds();
                coordinates.forEach((c) => bounds.extend(c));
                mapRef.current.fitBounds(bounds, 100);
            }
            return;
        }

        if (lat && lng) {
            const position = { lat, lng };
            mapRef.current.panTo(position);
            return;
        }

        if (address) {
            (async () => {
                const res = await getLatLngFromAddress(address);
                if (res) {
                    setAddressLocation(res.location);
                    mapRef.current!.panTo(res.location);
                    onChange?.(res.location);
                }
            })();
        }
    }, [coordinates, lat, lng, address]);

    if (!isLoaded) return <div>Loading map...</div>;

    // Center theo ưu tiên
    const center =
        coordinates?.[0] ??
        (lat && lng ? { lat, lng } : undefined) ??
        addressLocation ??
        quyNhonCoordinates;

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={12}
            onLoad={onLoad}
        >
            {coordinates?.map((c, i) => (
                <Marker key={`${c.lat}-${c.lng}-${i}`} position={c} />
            ))}

            {!coordinates?.length && lat && lng && (
                <Marker position={{ lat, lng }} />
            )}

            {!coordinates?.length && !lat && !lng && addressLocation && (
                <Marker position={addressLocation} />
            )}
        </GoogleMap>
    );
};

export default Map;
