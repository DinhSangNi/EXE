import { useRef } from "react";
import PostCard from "./PostCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import type { Post } from "@/stores/type";
type Props = {
    title?: string;
    data?: Post[];
};

const PostCarousel = ({ title, data }: Props) => {
    const swiperRef = useRef<SwiperCore>(null);

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
                <div className="flex items-center justify-between">
                    <h1 className="my-4 flex items-center gap-1 text-[1.2rem] font-bold">
                        <p>{title}</p>
                        <span>{">"}</span>
                    </h1>
                    <div className="flex gap-2 text-[1.2rem] font-bold">
                        <button
                            className="h-8 w-8 rounded-full bg-gray-100 text-center hover:bg-gray-200"
                            onClick={handlePrevious}
                        >
                            <p>{"<"}</p>
                        </button>
                        <button
                            className="h-8 w-8 rounded-full bg-gray-100 text-center hover:bg-gray-200"
                            onClick={handleNext}
                        >
                            <p>{">"}</p>
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
                    {data &&
                        data.map((item) => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <PostCard
                                        className="h-[450px] border border-gray-200"
                                        data={item}
                                    />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </>
    );
};

export default PostCarousel;
