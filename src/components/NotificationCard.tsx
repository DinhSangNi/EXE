// import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import type { NotificationItem } from "./NotificationBell";
import useMarkNotificationRead from "@/hooks/notification/useMarkNotificationRead";
import { formatToVietnamTime } from "@/utils/format";

interface Props {
    notification: NotificationItem;
}

const NotificationCard = ({ notification }: Props) => {
    const navigate = useNavigate();
    const { mutate: markRead } = useMarkNotificationRead();

    // Nếu là appointment thì lấy dữ liệu chi tiết
    const appointment =
        notification?.notificationAppointments?.[0]?.appointment;
    const post = appointment?.appointmentPosts?.[0]?.post;

    const handleClick = () => {
        // mark read trước khi navigate
        if (!notification.isRead && notification.userNotificationId) {
            markRead(notification.userNotificationId);
        }

        if (appointment) {
            navigate(
                `/user/appointment/${notification.notificationAppointments[0].appointment.id}`
            );
        } else if (post) {
            navigate(`/posts/${post.id}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer border p-2 transition-colors hover:bg-gray-50 ${notification.isRead ? "bg-white" : "bg-gray-100"} ${notification.isRead ? "font-normal" : "font-semibold"}`}
        >
            {/* Tiêu đề & nội dung */}
            <h4 className="text-sm">{notification?.title}</h4>
            <p className="text-sm text-gray-600">{notification?.message}</p>

            {/* Thời gian & trạng thái */}
            {appointment && (
                <div className="mt-2 text-sm">
                    <p>
                        <span className="font-medium">Thời gian:</span>{" "}
                        {formatToVietnamTime(appointment?.appointmentDateTime)}
                    </p>
                </div>
            )}

            {/* Chỉ hiện tên bài đăng */}
            {post && (
                <div className="text-sm">
                    <p>
                        <span className="font-medium">Bài đăng:</span>{" "}
                        {post?.title}
                    </p>
                </div>
            )}

            {/* Ngày tạo */}
            <div className="mt-2 text-xs text-gray-500">
                {formatToVietnamTime(notification?.createdAt)}
            </div>
        </div>
    );
};

export default NotificationCard;
