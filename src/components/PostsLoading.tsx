import { Card, Skeleton } from "antd";
import PostCardLoading from "./PostCardLoading";

interface PostsLoadingProps {
    showMap?: boolean;
}

const PostsLoading = ({ showMap = false }: PostsLoadingProps) => {
    const renderSkeletonCards = () => {
        return Array.from({ length: 9 }, (_, index) => (
            <PostCardLoading key={index} />
        ));
    };

    return (
        <div className="mx-auto w-full bg-white px-14">
            <div className={`grid w-full ${showMap ? "grid-cols-7" : ""}`}>
                {/* Khu vực post card loading */}
                <div className="col-span-4 py-8 pr-12">
                    {/* Header loading */}
                    <div className="flex items-center justify-between pb-6">
                        <Skeleton.Button active size="large" />
                        <Skeleton.Button active size="default" />
                    </div>

                    {/* Post cards loading */}
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {renderSkeletonCards()}
                    </div>

                    {/* Pagination loading */}
                    <div className="flex justify-center py-4">
                        <Skeleton.Button active size="default" />
                    </div>
                </div>

                {/* Map loading */}
                {showMap && (
                    <div className="sticky right-0 top-[calc(var(--lean-header-height)+32px)] col-span-3 my-8 h-[calc(100vh-var(--lean-header-height)-64px)] overflow-hidden rounded-3xl">
                        <Card className="h-full">
                            <Skeleton
                                active
                                paragraph={{ rows: 10 }}
                                title={{ width: "50%" }}
                            />
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostsLoading;
