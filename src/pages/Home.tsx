/* eslint-disable */
import HeroCarousel from "@/components/HeroCarousel";
import PostCarousel from "@/components/PostCarousel";
import {
    PhoneOutlined,
    MessageOutlined,
    CustomerServiceOutlined,
    HomeOutlined,
    SafetyOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import usePosts from "@/hooks/posts/usePosts";

const Home = () => {
    const { data, isLoading } = usePosts(
        {
            status: "approved",
        },
        "admin"
    );

    return (
        <>
            <div className="w-full bg-gray-50">
                <HeroCarousel />

                {/* Why Choose Us Section */}
                <div className="mx-auto mt-16 w-[90%]">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Tại sao chọn UHome?
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Giải pháp tìm nhà trọ hoàn hảo cho bạn
                        </p>
                    </div>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                className="h-full text-center shadow-md transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                    <HomeOutlined className="text-3xl text-blue-500" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Đa dạng lựa chọn
                                </h3>
                                <p className="text-gray-600">
                                    Hàng ngàn phòng trọ, chung cư, nhà nguyên
                                    căn đang chờ bạn
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                className="h-full text-center shadow-md transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <SafetyOutlined className="text-3xl text-green-500" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    An toàn & Uy tín
                                </h3>
                                <p className="text-gray-600">
                                    Mọi thông tin đều được xác thực và kiểm
                                    duyệt kỹ lưỡng
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                className="h-full text-center shadow-md transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                    <ThunderboltOutlined className="text-3xl text-orange-500" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Nhanh chóng
                                </h3>
                                <p className="text-gray-600">
                                    Tìm kiếm và đặt lịch xem phòng chỉ trong vài
                                    phút
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Chỗ ở đề xuất */}
                <div className="mx-auto mt-16 w-[90%]">
                    <PostCarousel
                        title="Chỗ ở đề xuất"
                        data={
                            isLoading ? Array(6).fill(null) : data?.data || []
                        }
                        loading={isLoading}
                    />
                </div>

                {/* Bài đăng mới */}
                <div className="mx-auto mt-16 w-[90%]">
                    <PostCarousel
                        title="Bài đăng mới"
                        data={
                            isLoading
                                ? Array(6).fill(null)
                                : data
                                  ? data.data
                                  : []
                        }
                        loading={isLoading}
                    />
                </div>

                {/* Hỗ trợ khách hàng */}
                <div className="mx-auto mb-16 mt-16 w-[90%]">
                    <Card className="overflow-hidden shadow-xl">
                        <Row gutter={[32, 32]} align="middle">
                            <Col xs={24} md={12} className="text-center">
                                <img
                                    src="https://phongtro123.com/images/contact-us-pana-orange.svg"
                                    alt="admin support image"
                                    className="mx-auto w-3/4 max-w-md object-cover"
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                        <CustomerServiceOutlined className="text-3xl text-blue-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                                        Hỗ trợ chủ nhà đăng tin
                                    </h2>
                                    <p className="mt-4 max-w-md text-gray-600">
                                        Bạn là chủ nhà và muốn đăng tin cho
                                        thuê? Hãy liên hệ với chúng tôi để được
                                        hỗ trợ nhanh chóng và hiệu quả nhất.
                                    </p>
                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <a
                                            href="tel:0359069089"
                                            className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-white shadow-md transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-lg"
                                        >
                                            <PhoneOutlined className="text-xl" />
                                            <span className="font-medium">
                                                0359069089
                                            </span>
                                        </a>
                                        <a
                                            href="sms:0359069089"
                                            className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
                                        >
                                            <MessageOutlined className="text-xl" />
                                            <span className="font-medium">
                                                Nhắn tin
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Home;
