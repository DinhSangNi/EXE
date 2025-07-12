export type Media = {
    id: string;
    public_id: string;
    url: string;
    type: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    phone?: string;
    medias?: Media[];
};

export type Amenity = {
    id: string;
    name: string;
};

export type Catagory = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateRoomDto = {
    title: string;
    city: string; // ví dụ: "1|Thành phố Hà Nội"
    district: string; // ví dụ: "1|Quận Ba Đình"
    ward: string; // ví dụ: "1|Phường Phúc Xá"
    street?: string;
    latitude: number;
    longitude: number;
    square: number;
    categoryId: string;
    description: string;
    price: number;
    mediaIds: string[]; // UUIDs
    amenitiesId?: string[]; // UUIDs
};

export type PostAmenities = {
    id: string;
    amenity: Amenity;
};

export type Post = {
    category: Catagory;
    city: string;
    createdAt: string;
    deletedAt: string | null;
    description: string;
    district: string;
    id: string;
    status: "pending" | "approved" | "rejected" | "expired";
    latitude: number;
    longitude: number;
    medias: Media[];
    postAmenities: PostAmenities[];
    price: number;
    square: number;
    street: string;
    title: string;
    updatedAt: string;
    ward: string;
    expiredAt: string;
    owner?: User;
};

// export type CurrencyByCategory = {
//     "Nhà trọ": "đồng/phòng",
//     "Nhà Nguyên Căn": "đồng/căn",
//     "Chung cư/Căn Hộ": "đồng/căn",
//     "Mặt bằng/Văn phòng": ""
// }

export interface PaginationResponse<T> {
    page?: number;
    limit?: number;
    totalAllItems?: number;
    totalItems: number;
    totalPages?: number;
    data: T;
}

export type PaginationType = {
    page: number;
    limit: number;
};

export type postFilter = {
    minPrice?: number;
    maxPrice?: number;
    minSquare?: number;
    maxSquare?: number;
    province?: string;
    district?: string;
    ward?: string;
    category?: string;
    amenities?: string[];
};
