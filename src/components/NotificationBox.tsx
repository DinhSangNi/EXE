import type { Notification } from "@/stores/type";
import NotificationCard from "./NotificationCard";

type Props = {
    items?: Notification[];
    totalAllItems?: number;
};

const NotificationBox = ({ items = [], totalAllItems = 0 }: Props) => {
    const hasMore = totalAllItems > 5;

    return (
        <div className="w-80 rounded-lg">
            <h3 className="mb-2 text-[20px] font-semibold">Thông báo</h3>

            {/* Danh sách thông báo */}
            <div className="max-h-60 overflow-y-auto">
                {items.length > 0 ? (
                    items.map((item) => (
                        <NotificationCard key={item.id} data={item} />
                    ))
                ) : (
                    <p className="w-full py-4 text-center text-[16px]">
                        Không có thông báo mới
                    </p>
                )}
            </div>

            {/* Xem thêm */}
            {hasMore && (
                <div className="mb-1 mt-3 w-full">
                    <button className="w-full text-center text-[12px] hover:text-primary">
                        Xem thêm
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationBox;
