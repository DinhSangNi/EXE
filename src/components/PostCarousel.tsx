/* eslint-disable */
import { useRef } from "react";
import PostCard from "./PostCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useNavigate } from "react-router-dom";
import type { Post } from "@/stores/type";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

type Props = {
    title?: string;
    data?: any;
    loading?: boolean;
};

const PostCarousel = ({ title, data = [], loading = false }: Props) => {
    const swiperRef = useRef<SwiperCore>(null);
    const navigate = useNavigate();

    const handleNext = () => {
        if (!swiperRef.current) return;
        swiperRef.current?.slideNext();
    };

    const handlePrevious = () => {
        if (!swiperRef.current) return;
        swiperRef.current?.slidePrev();
    };

    return (
        <>
            <div className="w-full">
                <div className="mb-6 flex items-center justify-between">
                    {title && (
                        <h2 className="text-2xl font-bold text-gray-800">
                            {title}
                        </h2>
                    )}
                    <div className="flex gap-3">
                        <button
                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-md"
                            onClick={handlePrevious}
                        >
                            <LeftOutlined className="text-base" />
                        </button>
                        <button
                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-md"
                            onClick={handleNext}
                        >
                            <RightOutlined className="text-base" />
                        </button>
                    </div>
                </div>
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    spaceBetween={25}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                        1280: {
                            slidesPerView: 3,
                        },
                        1536: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {data && data.length > 0 ? (
                        data?.map((post: Post, idx: number) => (
                            <SwiperSlide key={post?.id || idx}>
                                <div
                                    onClick={() =>
                                        post &&
                                        post.id &&
                                        navigate(`/posts/${post.id}`)
                                    }
                                >
                                    <PostCard data={post} loading={loading} />
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="w-full text-center">
                            Không có bài viết nào
                        </p>
                    )}
                </Swiper>
                {data && data.length > 6 && (
                    <div className="mt-8 w-full text-center">
                        <button
                            className="rounded-lg bg-blue-500 px-8 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg"
                            onClick={() => navigate("/posts")}
                        >
                            Xem thêm
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default PostCarousel;
