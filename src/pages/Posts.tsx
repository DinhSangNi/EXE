import Map from "@/components/Map";
import usePosts from "@/hooks/posts/usePosts";
import { useSearchParams } from "react-router-dom";

const Posts = () => {
    const [searchParams] = useSearchParams();

    const provinceName = searchParams.get("province")?.split("|")[1];
    const districtName = searchParams.get("district")?.split("|")[1];

    const { data, isLoading } = usePosts({
        province: searchParams.get("province") as string,
        district: searchParams.get("district") as string,
    });

    return (
        <>
            <div className="mx-auto w-[90%]">
                <div className="grid w-full grid-cols-2">
                    {/* searched posts */}
                    <div className="w-full pt-6">
                        {!isLoading && data?.data && data?.data.length > 0 ? (
                            <>
                                <h1 className="pb-6 text-[0.9rem] font-bold">
                                    {data?.totalItems} bài đăng tại{" "}
                                    {`${districtName}, ${provinceName}`}
                                </h1>
                                <div className="grid min-h-[500px] grid-cols-3">
                                    {data?.data &&
                                        data?.data.map((post) => {
                                            return (
                                                <div key={post.id}>
                                                    <img
                                                        src={post.medias[0].url}
                                                        alt="cover-image"
                                                        className="aspect-square w-full rounded-xl"
                                                    />
                                                    <div className="p-2">
                                                        <h1 className="line-clamp-2 text-[0.9rem] font-bold">
                                                            {post.title}
                                                        </h1>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    {/* maps */}
                    <div className="sticky right-0 top-[var(--header-height)] h-[calc(100vh-var(--header-height))] w-[calc(100vw/2)] p-8">
                        <Map
                            coordinates={data?.data.map((post) => ({
                                lat: post.latitude,
                                lng: post.longitude,
                            }))}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Posts;
