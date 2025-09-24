import type { Notification } from "@/stores/type";
import NotificationCard from "./NotificationCard";

type Props = {
    items: Notification[] | undefined;
    totalAllItems: number | undefined;
};

const NotificationBox = ({ items, totalAllItems }: Props) => {
    return (
        <div className="w-80 rounded-lg">
            <h3 className="mb-2 text-[20px] font-semibold">Thông báo</h3>
            <div className="max-h-60 overflow-y-auto">
                {items && items.length > 0 ? (
                    items.map((item: Notification) => {
                        return <NotificationCard data={item} />;
                    })
                ) : (
                    <p className="w-full py-4 text-center text-[16px]">
                        không có thông báo mới
                    </p>
                )}
            </div>
            {totalAllItems && totalAllItems > 5 && (
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
