import { Carousel } from "antd";
import PostCard from "./PostCard";
import { useRef } from "react";
import type { CarouselRef } from "antd/es/carousel";

type Props = {
    title?: string;
    data?: any;
};

const PostCarousel = ({ title, data }: Props) => {
    const carouselRef = useRef<CarouselRef>(null);

    const handleNext = () => {
        if (carouselRef.current) carouselRef.current?.next();
    };

    const handlePrevious = () => {
        if (carouselRef.current) carouselRef.current?.prev();
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
                <Carousel
                    ref={carouselRef}
                    dots={false}
                    slidesToShow={6}
                    slidesToScroll={1}
                >
                    {Array.from({ length: 10 }, () => {
                        return (
                            <div>
                                <PostCard imageSrc="https://a0.muscache.com/im/pictures/miso/Hosting-823410792395034757/original/47e59899-0f67-4790-9035-ec74f499af64.jpeg?im_w=1200" />
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </>
    );
};

export default PostCarousel;
