import { getLatLngFromAddress } from "@/utils/googleMap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { memo, useEffect, useState } from "react";

type Props = {
    address: string;
    onChange: (location: Coordinates) => void;
    lat?: number;
    lng?: number;
};

export type Coordinates = {
    lat: number;
    lng: number;
};

const containerStyle = {
    width: "100%",
    height: "100%",
};

const quyNhonCoordinates = {
    lat: 13.782,
    lng: 109.2193,
};

const Map = memo(({ address, onChange, lat, lng }: Props) => {
    // console.log("address: ", address);
    const [mapView, setMapView] = useState<{
        location: Coordinates;
        zoom: number;
    }>();

    useEffect(() => {
        if (address) {
            const convertAddressToCoordinates = async () => {
                const resolvedCoordinates = await getLatLngFromAddress(address);
                if (resolvedCoordinates) {
                    setMapView(resolvedCoordinates);
                    onChange(resolvedCoordinates.location);
                }
            };
            convertAddressToCoordinates();
        } else if (lat && lng) {
            setMapView({
                location: { lat, lng },
                zoom: 15,
            });
            onChange({ lat, lng });
        }
    }, [address, lat, lng]);

    return (
        <>
            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapView?.location || quyNhonCoordinates}
                    zoom={mapView ? mapView.zoom : 12}
                >
                    {mapView ? (
                        <Marker position={mapView.location} />
                    ) : (
                        <Marker position={quyNhonCoordinates} />
                    )}
                </GoogleMap>
            </LoadScript>
        </>
    );
});

export default Map;
