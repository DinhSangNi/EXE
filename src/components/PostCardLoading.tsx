import { Card, Skeleton } from "antd";

const PostCardLoading = () => {
    return (
        <Card className="overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
            {/* Image skeleton */}
            <Skeleton.Image active className="!h-48 !w-full rounded-t-lg" />

            {/* Content skeleton */}
            <div className="space-y-3 p-4">
                {/* Title */}
                <Skeleton active title={{ width: "80%" }} paragraph={false} />

                {/* Price */}
                <Skeleton.Button active size="small" className="!w-24" />

                {/* Description */}
                <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 2, width: ["100%", "60%"] }}
                />

                {/* Location and details */}
                <div className="flex items-center justify-between">
                    <Skeleton.Button active size="small" className="!w-16" />
                    <Skeleton.Button active size="small" className="!w-12" />
                </div>

                {/* Bottom info */}
                <div className="flex items-center justify-between border-t pt-2">
                    <div className="flex items-center space-x-2">
                        <Skeleton.Avatar active size="small" />
                        <Skeleton.Button
                            active
                            size="small"
                            className="!w-20"
                        />
                    </div>
                    <Skeleton.Button active size="small" className="!w-16" />
                </div>
            </div>
        </Card>
    );
};

export default PostCardLoading;
