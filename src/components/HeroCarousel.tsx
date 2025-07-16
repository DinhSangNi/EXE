import { Carousel } from "antd";
import carouselImage from "@/assets/images/carouselimg.png";

const contentStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    maxHeight: "500px",
    margin: "0 auto",
    display: "block",
};

const HeroCarousel = () => {
    // Tạo mảng chứa 3 lần cùng một ảnh để demo
    const carouselItems = Array(3).fill(carouselImage);

    return (
        <div className="w-full">
            <Carousel
                autoplay
                effect="fade"
                className="flex w-full items-center justify-center"
                dotPosition="bottom"
                style={{ backgroundColor: "#f8f9fa" }}
            >
                {carouselItems.map((img, index) => (
                    <div key={index}>
                        <img
                            src={img}
                            alt={`Banner ${index + 1}`}
                            style={contentStyle}
                            className="h-auto max-h-[500px] w-full object-contain"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroCarousel;
