/* eslint-disable */
import { useParams, useNavigate } from "react-router-dom";
import { Divider, Spin, Card, Button, Tag } from "antd";
import useAppointmentById from "@/hooks/appointment/useAppointmentById";
import useUpdateAppointment from "@/hooks/appointment/useUpdateAppointment";
import { formatToVietnamTime, resolveAddress } from "@/utils/format";
import type { updateAppointmentDto } from "@/stores/type";
import { FaArrowLeft } from "react-icons/fa";

const AppointmentDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: appointment, isLoading } = useAppointmentById(id!);
    const { mutate: updateAppointment, isPending: isUpdating } =
        useUpdateAppointment();

    const handleUpdateStatus = (
        status: "confirmed" | "rejected" | "cancelled"
    ) => {
        if (!appointment) return;
        const dto: updateAppointmentDto = { status };
        updateAppointment({ id: appointment.id, updateAppointmentDto: dto });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "red";
            case "confirmed":
                return "green";
            case "rejected":
                return "gray";
            case "cancelled":
                return "orange";
            default:
                return "blue";
        }
    };

    if (isLoading || !appointment) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 py-6">
            <div className="mx-auto w-4/5">
                {/* Header */}
                <div className="mb-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded p-2 transition hover:bg-gray-200"
                    >
                        <FaArrowLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Chi tiết lịch hẹn
                    </h1>
                </div>
                <Divider />

                {/* Thông tin cơ bản */}
                <Card className="mb-6 rounded-lg border border-gray-200 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold">
                        Thông tin cơ bản
                    </h2>
                    <div className="space-y-2 text-gray-700">
                        <p>
                            <strong>ID: </strong> {appointment.id}
                        </p>
                        <p>
                            <strong>Người đặt lịch: </strong>{" "}
                            {appointment.user.name}
                        </p>
                        <p>
                            <strong>Người được đặt lịch: </strong>{" "}
                            {appointment.host.name}
                        </p>
                        <p>
                            <strong>Ngày hẹn: </strong>{" "}
                            {formatToVietnamTime(
                                appointment.appointmentDateTime
                            )}
                        </p>
                        <p>
                            <strong>Trạng thái: </strong>{" "}
                            <Tag
                                color={getStatusColor(appointment.status)}
                                className="rounded-full px-4 py-1 font-semibold text-white"
                            >
                                {appointment.status === "pending"
                                    ? "Đang chờ"
                                    : appointment.status === "confirmed"
                                      ? "Đã xác nhận"
                                      : appointment.status === "rejected"
                                        ? "Đã từ chối"
                                        : "Đã hủy"}
                            </Tag>
                        </p>
                    </div>
                </Card>

                {/* Bài đăng liên quan */}
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    Bài đăng liên quan
                </h2>
                <div className="space-y-4">
                    {appointment.appointmentPosts.map((apPost) => (
                        <Card
                            key={apPost.id}
                            className="cursor-pointer rounded-lg border border-gray-200 shadow-sm transition hover:shadow-md"
                            onClick={() => navigate(`/posts/${apPost.post.id}`)}
                        >
                            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">
                                        {apPost.post.title}
                                    </p>
                                    <p className="text-gray-600">
                                        {resolveAddress(
                                            apPost.post.city,
                                            apPost.post.district,
                                            apPost.post.ward,
                                            apPost.post.street
                                        )}
                                    </p>
                                </div>
                                <div className="mt-2 flex gap-4 text-gray-700 md:mt-0">
                                    <p>
                                        <strong>Giá: </strong>
                                        {apPost.post.price.toLocaleString()} VNĐ
                                    </p>
                                    <p>
                                        <strong>Diện tích: </strong>
                                        {apPost.post.square} m²
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Hành động */}
                <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                        type="primary"
                        size="large"
                        loading={isUpdating}
                        disabled={
                            appointment.status !== "pending" || isUpdating
                        }
                        onClick={() => handleUpdateStatus("confirmed")}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        danger
                        size="large"
                        loading={isUpdating}
                        disabled={
                            appointment.status !== "pending" || isUpdating
                        }
                        onClick={() => handleUpdateStatus("rejected")}
                    >
                        Từ chối
                    </Button>
                    <Button
                        size="large"
                        loading={isUpdating}
                        disabled={
                            appointment.status === "cancelled" || isUpdating
                        }
                        onClick={() => handleUpdateStatus("cancelled")}
                    >
                        Hủy
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetail;
