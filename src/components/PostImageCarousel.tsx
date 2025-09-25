import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import type { CarouselRef } from "antd/es/carousel";

interface PostImageCarouselProps {
    images: Array<{ url: string }>;
    className?: string;
    height?: string;
}

const PostImageCarousel = ({
    images,
    className = "",
    height = "h-48",
}: PostImageCarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef<CarouselRef>(null);

    const handlePrevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        carouselRef.current?.prev();
    };

    const handleNextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        carouselRef.current?.next();
    };

    const hasMultipleImages = images && images.length > 1;

    if (!images || images.length === 0) {
        return (
            <div
                className={`${height} ${className} flex items-center justify-center bg-gray-200`}
            >
                <span className="text-gray-400">Không có hình ảnh</span>
            </div>
        );
    }

    return (
        <div className={`relative ${height} ${className}`}>
            <Carousel
                ref={carouselRef}
                dots={false}
                afterChange={(current) => setCurrentSlide(current)}
                className="h-full"
            >
                {images.map((image, index) => (
                    <div key={index} className={height}>
                        <img
                            src={image.url}
                            alt={`Image ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </Carousel>

            {/* Navigation buttons */}
            {hasMultipleImages && (
                <>
                    {/* Previous button - chỉ hiển thị khi không phải slide đầu */}
                    {currentSlide > 0 && (
                        <Button
                            type="text"
                            icon={<LeftOutlined />}
                            onClick={handlePrevSlide}
                            className="absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 transform rounded-full bg-white/80 shadow-md hover:bg-white"
                            size="small"
                        />
                    )}

                    {/* Next button - chỉ hiển thị khi không phải slide cuối */}
                    {currentSlide < images.length - 1 && (
                        <Button
                            type="text"
                            icon={<RightOutlined />}
                            onClick={handleNextSlide}
                            className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 transform rounded-full bg-white/80 shadow-md hover:bg-white"
                            size="small"
                        />
                    )}

                    {/* Slide indicator */}
                    <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
                        {currentSlide + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
};

export default PostImageCarousel;
