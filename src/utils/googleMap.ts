import type { Coordinates } from "@/components/Map";

export type AddressComponent = {
    long_name: string;
    short_name: string;
    types: string[];
};

export function getZoomFromAddressComponents(
    components: AddressComponent[]
): number {
    const levels = components.map((c) => c.types).flat();

    if (
        levels.includes("subpremise") ||
        levels.includes("street_number") ||
        levels.includes("premise")
    ) {
        return 18; // địa chỉ nhà/căn hộ
    } else if (levels.includes("route")) {
        return 17; // đường
    } else if (
        levels.includes("neighborhood") ||
        levels.includes("sublocality_level_1") ||
        levels.includes("administrative_area_level_3")
    ) {
        return 15; // xã/ấp
    } else if (levels.includes("administrative_area_level_2")) {
        return 13; // huyện
    } else if (levels.includes("administrative_area_level_1")) {
        return 10; // tỉnh
    } else {
        return 8; // quốc gia / fallback
    }
}

export async function getLatLngFromAddress(
    address: string
): Promise<{ location: Coordinates; zoom: number } | null> {
    try {
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await res.json();
        if (data.status === "OK") {
            const location = data.results[0].geometry.location;
            const zoom = getZoomFromAddressComponents(
                data.results[0].address_components
            );

            return { location, zoom };
        } else {
            throw new Error(`Geocoding failed: ${data.status}`);
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        return null;
    }
}
