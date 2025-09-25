import type { Notification } from "@/stores/type";
import { Card, Badge } from "antd";

interface Props {
    notification: Notification;
}

const NotificationCard = ({ notification }: Props) => {
    // Nếu là appointment thì lấy dữ liệu chi tiết
    const appointment =
        notification?.notificationAppointments?.[0]?.appointment;
    const post = appointment?.appointmentPosts?.[0]?.post;

    return (
        <Card className="p-3">
            <h4 className="font-semibold">{notification?.title}</h4>
            <p className="text-sm text-gray-600">{notification?.message}</p>

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

            {post && (
                <div className="mt-2 border-t pt-2 text-sm">
                    <p>
                        <span className="font-medium">Bài đăng:</span>{" "}
                        {post?.title}
                    </p>
                    <p>
                        <span className="font-medium">Giá:</span>{" "}
                        {post?.price.toLocaleString("vi-VN")} VND/tháng
                    </p>
                    <p>
                        <span className="font-medium">Địa chỉ:</span>{" "}
                        {`${post?.street}, ${post?.ward}, ${post?.district}, ${post?.city}`}
                    </p>
                </div>
            )}

            <div className="mt-2 text-xs text-gray-500">
                {new Date(notification?.createdAt).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </div>
        </Card>
    );
};

export default NotificationCard;
