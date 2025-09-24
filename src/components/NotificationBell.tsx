import { Popover } from "antd";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import NotificationBox from "./NotificationBox";
import useNotifications from "@/hooks/notification/useNotifications";

const NotificationBell = () => {
    const [openNotificationBox, setOpenNotificationBox] =
        useState<boolean>(false);
    const { data } = useNotifications({});

    return (
        <div>
            <Popover
                content={
                    <NotificationBox
                        items={data?.data}
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
                    {!!data?.totalItems && (
                        <div className="absolute -right-1/3 -top-1/3 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-400">
                            <p className="text-[13px] text-white">
                                {data?.totalItems}
                            </p>
                        </div>
                    )}
                </div>
            </Popover>
        </div>
    );
};

export default NotificationBell;
