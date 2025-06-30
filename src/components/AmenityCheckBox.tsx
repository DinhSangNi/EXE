import { AmenityServices } from "@/services/amenity";
import type { Amenity } from "@/stores/type";
import { Checkbox, type CheckboxOptionType, type GetProp } from "antd";
import { useEffect, useState } from "react";

type Props = {
    amentites: string[];
    setAmenities: (amenities: string[]) => void;
    className?: string;
};

const AmenityCheckBox = ({ amentites, setAmenities, className }: Props) => {
    const [options, setOptions] = useState<CheckboxOptionType<string>[]>([]);

    const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
        checkedValues
    ) => {
        setAmenities(checkedValues as string[]);
    };

    useEffect(() => {
        const fetchAmenitiesDefault = async () => {
            try {
                const res = await AmenityServices.getAll();
                if (res.status === 200) {
                    const amenities: Amenity[] = res.data.metadata;
                    setOptions(
                        amenities.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))
                    );
                }
            } catch (error) {
                console.log("error: ", error);
            }
        };

        fetchAmenitiesDefault();
    }, []);

    return (
        <>
            <div className={`w-full ${className}`}>
                <Checkbox.Group
                    className="grid w-full grid-cols-4"
                    options={options}
                    value={amentites}
                    onChange={onChange}
                />
            </div>
        </>
    );
};

export default AmenityCheckBox;
