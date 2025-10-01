/* eslint-disable */
import type { Post } from "@/stores/type";
import { getLatLngFromAddress } from "@/utils/googleMap";
import {
    GoogleMap,
    InfoBox,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import CustomMarker from "./CustomMarker";
import PostMapInfoWindow from "./posts/PostMapInfoWindow";

type Props = {
    address?: string;
    onChange?: (location: Coordinates) => void;
    lat?: number;
    lng?: number;
    posts?: Post[];
};

export type Coordinates = {
    lat: number;
    lng: number;
};

const quyNhonCoordinates: Coordinates = {
    lat: 13.782,
    lng: 109.2193,
};

const Map = ({ address, onChange, lat, lng, posts }: Props) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const mapRef = useRef<google.maps.Map | null>(null);
    const [addressLocation, setAddressLocation] = useState<Coordinates | null>(
        null
    );
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    // geocode address nếu thay đổi
    const geocodeAddress = useCallback(async () => {
        if (address) {
            const res = await getLatLngFromAddress(address);
            if (res) {
                setAddressLocation(res.location);
                mapRef.current?.panTo(res.location);
                onChange?.(res.location);
            }
        }
    }, [address, onChange]);

    // Pan/Fit map khi props thay đổi
    useEffect(() => {
        if (!mapRef.current) return;

        // Nếu có posts
        if (posts && posts.length > 0) {
            if (posts.length === 1) {
                mapRef.current.panTo({
                    lat: posts[0].latitude,
                    lng: posts[0].longitude,
                });
            } else {
                const bounds = new google.maps.LatLngBounds();
                posts.forEach((post) =>
                    bounds.extend({ lat: post.latitude, lng: post.longitude })
                );
                mapRef.current.fitBounds(bounds, 100);
            }
            return;
        }

        // Nếu có lat/lng
        if (lat && lng) {
            const position = { lat, lng };
            mapRef.current.panTo(position);
            return;
        }

        // Nếu có address
        if (address) {
            geocodeAddress();
        }
    }, [posts, lat, lng, address, geocodeAddress]);

    if (!isLoaded) return <div>Loading map...</div>;

    // Tính center hiển thị map lần đầu
    const center: Coordinates =
        posts && posts.length > 0
            ? { lat: posts[0].latitude, lng: posts[0].longitude }
            : lat && lng
              ? { lat, lng }
              : addressLocation
                ? addressLocation
                : quyNhonCoordinates;

    return (
        <div className="relative h-full w-full">
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={center}
                zoom={12}
                onLoad={onLoad}
            >
                {/* Nếu có nhiều tọa độ, hiển thị tất cả */}
                {posts?.map((post) => (
                    <CustomMarker
                        key={post.id}
                        lat={post.latitude}
                        lng={post.longitude}
                        price={post.price}
                        selected={selectedPost?.id === post.id}
                        onClick={() => setSelectedPost(post)}
                    />
                ))}

                {selectedPost && (
                    <InfoBox
                        position={{
                            lat: selectedPost.latitude,
                            lng: selectedPost.longitude,
                        }}
                        options={{
                            closeBoxURL: "",
                            enableEventPropagation: true,
                            zIndex: 9999,
                        }}
                    >
                        <PostMapInfoWindow
                            post={selectedPost}
                            onClose={() => setSelectedPost(null)}
                        />
                    </InfoBox>
                )}

                {!posts?.length && lat && lng && (
                    <Marker position={{ lat, lng }} />
                )}

                {!posts?.length && !lat && !lng && addressLocation && (
                    <Marker position={addressLocation} />
                )}
            </GoogleMap>

            {address && (
                <div className="absolute left-[11px] top-[10px] w-1/3 bg-white p-2 shadow">
                    <h3 className="line-clamp-1 text-sm font-bold">
                        {address}
                    </h3>
                    <p className="mt-1 text-[10px]">{address}</p>
                    <a
                        className="text-[11px] text-blue-500 hover:underline"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View larger map
                    </a>
                </div>
            )}
        </div>
    );
};

export default Map;
