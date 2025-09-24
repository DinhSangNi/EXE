import type { Notification } from "@/stores/type";
import { formatPostDate } from "@/utils/format";
import { useNavigate } from "react-router-dom";

type Props = {
    data: Notification;
};

const NotificationCard = ({ data }: Props) => {
    const navigate = useNavigate();
    return (
        <div
            className="w-full cursor-pointer border-b-[1px] border-gray-400 py-2 hover:bg-gray-200"
            onClick={() => navigate("/user/appointment")}
        >
            <h1 className="line-clamp-1 text-[15px] font-bold">{data.title}</h1>
            <div className="flex items-end justify-between">
                <p className="line-clamp-2 flex-grow text-[12px]">
                    {data.message}
                </p>
                <p className="ml-2 flex-shrink-0 text-[12px] text-gray-500">
                    {formatPostDate(data.createdAt)}
                </p>
            </div>
        </div>
    );
};

export default NotificationCard;
