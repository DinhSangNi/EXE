/* eslint-disable */
import { Carousel } from "antd";
import carouselImage from "@/assets/images/carouselimg.png";

// Sample carousel data
const carouselItems = [
    {
        id: 1,
        image: carouselImage,
    },
    {
        id: 2,
        image: carouselImage,
    },
    {
        id: 3,
        image: carouselImage,
    },
];

const HeroCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        appendDots: (dots: any) => (
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <ul style={{ margin: "0", padding: "0" }}>{dots}</ul>
            </div>
        ),
        customPaging: (i: number) => (
            <div
                style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                        i === 0 ? "#1890ff" : "rgba(255, 255, 255, 0.5)",
                    margin: "0 4px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                }}
            />
        ),
    };

    return (
        <div className="relative w-full overflow-hidden">
            <Carousel {...settings}>
                {carouselItems.map((item) => (
                    <div key={item.id} className="relative">
                        <div className="relative h-[500px] w-full overflow-hidden">
                            <img
                                src={item.image}
                                alt="Carousel banner"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroCarousel;
