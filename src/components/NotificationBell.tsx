import { Popover } from "antd";
import { useState, useCallback, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import NotificationBox from "./NotificationBox";
import useNotifications from "@/hooks/notification/useNotifications";
import type { Notification, UserNotification } from "@/stores/type";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";

export type NotificationItem = Notification & {
    userNotificationId: string;
    isRead: boolean;
};

export const mapNotificationsForCurrentUser = (
    notifications: Notification[],
    currentUserId: string
) => {
    return notifications.map((n) => {
        const myUN: UserNotification | undefined = n.userNotifications.find(
            (un) => un.user.id === currentUserId
        );
        return {
            ...n,
            userNotificationId: myUN?.id ?? "",
            isRead: myUN?.isRead ?? false,
        };
    });
};

const NotificationBell = () => {
    const storedUser = useSelector((state: RootState) => state.user);

    const [openNotificationBox, setOpenNotificationBox] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleNewNotification = useCallback(() => {
        setOpenNotificationBox(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setOpenNotificationBox(false);
        }, 2000);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const { data } = useNotifications({}, handleNewNotification);
    const mappedItems = mapNotificationsForCurrentUser(
        data?.data || [],
        storedUser.id as string
    );

    return (
        <div>
            <Popover
                content={
                    <NotificationBox
                        items={mappedItems}
                        totalAllItems={data?.totalAllItems}
                    />
                }
                trigger="click"
                placement="bottomRight"
                open={openNotificationBox}
                onOpenChange={(open) => setOpenNotificationBox(open)}
            >
                <div className="relative flex items-center">
                    <button>
                        <FaBell className="h-5 w-5" />
                    </button>
                    {!!data?.totalUnreadItems && (
                        <div className="absolute -right-1/3 -top-1/3 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-400">
                            <p className="text-[13px] text-white">
                                {data?.totalUnreadItems}
                            </p>
                        </div>
                    )}
                </div>
            </Popover>
        </div>
    );
};

export default NotificationBell;
