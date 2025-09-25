import type { Notification } from "@/stores/type";
import { Badge } from "antd";
import { data, useNavigate } from "react-router-dom";

interface Props {
    notification: Notification;
}

const NotificationCard = ({ notification }: Props) => {
    const navigate = useNavigate();

    // Nếu là appointment thì lấy dữ liệu chi tiết
    const appointment =
        notification?.notificationAppointments?.[0]?.appointment;
    const post = appointment?.appointmentPosts?.[0]?.post;

    // Hàm khi click notification
    const handleClick = () => {
        if (appointment) {
            console.log(
                "id: ",
                notification.notificationAppointments[0].appointment.id
            );
            navigate(
                `/user/appointment/${notification.notificationAppointments[0].appointment.id}`
            );
        } else if (post) {
            navigate(`/posts/${post.id}`);
        }
    };

    return (
        <div
            className="cursor-pointer border p-2 hover:bg-gray-100"
            onClick={handleClick}
        >
            {/* Tiêu đề & nội dung */}
            <h4 className="font-semibold">{notification?.title}</h4>
            <p className="text-sm text-gray-600">{notification?.message}</p>

            {/* Thời gian & trạng thái */}
            {appointment && (
                <div className="mt-2 text-sm">
                    <p>
                        <span className="font-medium">Thời gian:</span>{" "}
                        {new Date(
                            appointment?.appointmentDateTime
                        ).toLocaleString("vi-VN")}
                    </p>
                    <p>
                        <span className="font-medium">Trạng thái:</span>{" "}
                        <Badge
                            status={
                                appointment?.status === "pending"
                                    ? "warning"
                                    : appointment?.status === "confirmed"
                                      ? "success"
                                      : "error"
                            }
                            text={appointment?.status}
                        />
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
                {new Date(notification?.createdAt).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </div>
        </div>
    );
};

export default NotificationCard;
