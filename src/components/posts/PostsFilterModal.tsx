 
import { Modal } from "antd";
import CategorySelector from "@/components/CategorySelector";
import AddressSelector from "@/components/AddressSelector";
import PriceSelector from "@/components/PriceSelector";
import SquareSelector from "@/components/SquareSelector";
import AmenityCheckBox from "@/components/AmenityCheckBox";
import type { PostFilter } from "@/stores/type";
import { useEffect, useState } from "react";

interface PostsFilterModalProps {
    open: boolean;
    onCancel: () => void;
    initialFilterData: Partial<PostFilter>;
    onApply: (newFilter: Partial<PostFilter>) => void;
}

const PostsFilterModal = ({
    open,
    onCancel,
    initialFilterData,
    onApply,
}: PostsFilterModalProps) => {
    const [localFilter, setLocalFilter] =
        useState<Partial<PostFilter>>(initialFilterData);

    useEffect(() => {
        setLocalFilter(initialFilterData);
    }, [initialFilterData, open]);

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={<h1 className="text-[1.2rem]">Bộ lọc</h1>}
            footer={
                <button
                    className="w-full rounded-md bg-primary p-2 text-white"
                    onClick={() => onApply(localFilter)}
                >
                    Áp dụng bộ lọc
                </button>
            }
            width={700}
        >
            <div>
                <CategorySelector
                    className="mb-2"
                    title={<p className="mb-1 font-bold">Danh mục cho thuê</p>}
                    value={localFilter.category}
                    mode="filter"
                    onChange={(value) =>
                        setLocalFilter((prev) => ({ ...prev, category: value }))
                    }
                />
                <div className="mb-2">
                    <p className="mb-1 font-bold">Địa chỉ</p>
                    <div className="flex justify-between gap-2">
                        <AddressSelector
                            type="province"
                            mode="filter"
                            value={localFilter.province}
                            onChange={(value) =>
                                setLocalFilter((prev) => ({
                                    ...prev,
                                    province: value,
                                    district: undefined,
                                    ward: undefined, // reset khi đổi province
                                }))
                            }
                        />
                        <AddressSelector
                            type="district"
                            provinceCode={localFilter?.province?.split("|")[0]}
                            value={localFilter?.district}
                            onChange={(value) =>
                                setLocalFilter((prev) => ({
                                    ...prev,
                                    district: value,
                                    ward: undefined, // reset khi đổi district
                                }))
                            }
                        />
                        <AddressSelector
                            type="ward"
                            districtCode={localFilter?.district?.split("|")[0]}
                            value={localFilter?.ward}
                            onChange={(value) =>
                                setLocalFilter((prev) => ({
                                    ...prev,
                                    ward: value,
                                }))
                            }
                        />
                    </div>
                </div>

                <div className="mb-2 flex justify-between gap-4">
                    <div className="flex-1">
                        <p className="mb-1 font-bold">Khoảng giá</p>
                        <PriceSelector
                            mode="filter"
                            className="w-full"
                            onChange={(value) =>
                                setLocalFilter((prev) => ({
                                    ...prev,
                                    minPrice: value.min ?? undefined,
                                    maxPrice: value.max ?? undefined,
                                }))
                            }
                        />
                    </div>
                    <div className="flex-1">
                        <p className="mb-1 font-bold">Khoảng diện tích</p>
                        <SquareSelector
                            className="w-full"
                            mode="filter"
                            onChange={(value) =>
                                setLocalFilter((prev) => ({
                                    ...prev,
                                    minSquare: value.min ?? undefined,
                                    maxSquare: value.max ?? undefined,
                                }))
                            }
                        />
                    </div>
                </div>

                <div>
                    <p className="mb-1 font-bold">Tiện ích</p>
                    <AmenityCheckBox
                        amentites={localFilter?.amenities ?? []}
                        setAmenities={(amenities: string[]) =>
                            setLocalFilter((prev) => ({
                                ...prev,
                                amenities,
                            }))
                        }
                    />
                </div>
            </div>
        </Modal>
    );
};

export default PostsFilterModal;
