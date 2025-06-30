import { useRef } from "react";
import PostCard from "./PostCard";
// import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
type Props = {
    title?: string;
    data?: any;
};

const PostCarousel = ({ title }: Props) => {
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
                    spaceBetween={10}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1280: {
                            slidesPerView: 6,
                        },
                        1536: {
                            slidesPerView: 7,
                        },
                    }}
                >
                    {Array.from({ length: 10 }, () => {
                        return (
                            <SwiperSlide>
                                <div>
                                    <PostCard imageSrc="https://a0.muscache.com/im/pictures/miso/Hosting-823410792395034757/original/47e59899-0f67-4790-9035-ec74f499af64.jpeg?im_w=1200" />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </>
    );
};

export default PostCarousel;
