import { OverlayView } from "@react-google-maps/api";

interface CustomMarkerProps {
    lat: number;
    lng: number;
    price: number;
    selected?: boolean;
    onClick?: () => void;
}

export default function CustomMarker({
    lat,
    lng,
    price,
    selected,
    onClick,
}: CustomMarkerProps) {
    return (
        <OverlayView
            position={{ lat, lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <div
                onClick={onClick}
                className={`inline-block cursor-pointer whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm font-semibold text-black shadow-md hover:bg-gray-100 ${selected && "bg-black text-white"}`}
            >
                {price.toLocaleString("vi-VN")}đ
            </div>
        </OverlayView>
    );
}
