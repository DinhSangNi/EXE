/* eslint-disable */
import { useParams, useNavigate } from "react-router-dom";
import { Divider, Spin, Card, Button, Tag, Modal } from "antd";
import useAppointmentById from "@/hooks/appointment/useAppointmentById";
import useUpdateAppointment from "@/hooks/appointment/useUpdateAppointment";
import { formatToVietnamTime, resolveAddress } from "@/utils/format";
import type { updateAppointmentDto } from "@/stores/type";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import SpinOverlay from "@/components/SpinOverlay ";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

const AppointmentDetail = () => {
    const storedUser = useSelector((state: RootState) => state.user);

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: appointment, isLoading } = useAppointmentById(id!);
    const { mutate: updateAppointment, isPending: isUpdating } =
        useUpdateAppointment();

    const [confirmModal, setConfirmModal] = useState<{
        visible: boolean;
        status: "confirmed" | "rejected" | "cancelled" | null;
        title: string;
        content: string;
    }>({
        visible: false,
        status: null,
        title: "",
        content: "",
    });

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

    // hàm mở modal xác nhận
    const openConfirmModal = (
        status: "confirmed" | "rejected" | "cancelled",
        title: string,
        content: string
    ) => {
        setConfirmModal({ visible: true, status, title, content });
    };

    return (
        <SpinOverlay
            loading={isUpdating}
            children={
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
                        <h2 className="mb-3 text-xl font-semibold">
                            Thông tin cơ bản
                        </h2>
                        <Card className="mb-6 rounded-lg border border-gray-200">
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
                                        color={getStatusColor(
                                            appointment.status
                                        )}
                                        className="rounded-full px-4 py-1 font-semibold text-white"
                                    >
                                        {appointment.status === "pending"
                                            ? "Đang chờ"
                                            : appointment.status === "confirmed"
                                              ? "Đã xác nhận"
                                              : appointment.status ===
                                                  "rejected"
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
                                    className="cursor-pointer rounded-lg border border-gray-200 !bg-white transition hover:shadow-md"
                                    onClick={() =>
                                        navigate(`/posts/${apPost.post.id}`)
                                    }
                                >
                                    <div className="flex flex-col justify-between gap-2 text-gray-800 md:flex-row md:items-center">
                                        <div className="flex-1">
                                            <p className="font-semibold">
                                                {apPost.post.title}
                                            </p>
                                            <p className="">
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
                                                {apPost.post.price.toLocaleString()}{" "}
                                                VNĐ
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
                            {(storedUser.role === "admin" ||
                                storedUser.id === appointment.host.id) && (
                                <>
                                    <CustomButton
                                        title="Xác nhận"
                                        disabled={
                                            appointment.status !== "pending" ||
                                            isUpdating
                                        }
                                        onClick={() =>
                                            openConfirmModal(
                                                "confirmed",
                                                "Xác nhận lịch hẹn",
                                                "Bạn có chắc muốn xác nhận lịch hẹn này không? Chú ý bạn sẽ không thể hủy hoặc từ chối sau khi xác nhận!"
                                            )
                                        }
                                    />

                                    <CustomButton
                                        title="Từ chối"
                                        disabled={
                                            appointment.status !== "pending" ||
                                            isUpdating
                                        }
                                        onClick={() =>
                                            openConfirmModal(
                                                "rejected",
                                                "Xác nhận từ chối lịch hẹn",
                                                "Bạn có chắc muốn từ chối lịch hẹn này không?"
                                            )
                                        }
                                    />
                                </>
                            )}

                            {storedUser.id === appointment.user.id && (
                                <Button
                                    type="default"
                                    className="border border-gray-200 bg-white font-bold hover:bg-gray-200"
                                    disabled={
                                        appointment.status === "cancelled" ||
                                        isUpdating
                                    }
                                    onClick={() =>
                                        openConfirmModal(
                                            "cancelled",
                                            "Xác nhận hủy lịch hẹn",
                                            "Bạn có chắc muốn hủy lịch hẹn này không?"
                                        )
                                    }
                                >
                                    Hủy
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Modal confirm */}
                    <Modal
                        open={confirmModal.visible}
                        title={confirmModal.title}
                        onOk={() => {
                            if (confirmModal.status)
                                handleUpdateStatus(confirmModal.status);
                            setConfirmModal({
                                ...confirmModal,
                                visible: false,
                            });
                        }}
                        onCancel={() =>
                            setConfirmModal({ ...confirmModal, visible: false })
                        }
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        {confirmModal.content}
                    </Modal>
                </div>
            }
        />
    );
};

export default AppointmentDetail;
