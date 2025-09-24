export type Media = {
    id: string;
    public_id: string;
    url: string;
    type: string;
    purpose: "avatar" | "post" | "other";
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
    title?: string;
    city?: string; // ví dụ: "1|Thành phố Hà Nội"
    district?: string; // ví dụ: "1|Quận Ba Đình"
    ward?: string; // ví dụ: "1|Phường Phúc Xá"
    street?: string;
    latitude?: number;
    longitude?: number;
    square?: number;
    categoryId?: string;
    description?: string;
    price?: number;
    mediaIds?: string[]; // UUIDs
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
    postAmenities?: PostAmenities[];
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

export type PostFilter = {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    minSquare?: number;
    maxSquare?: number;
    province?: string;
    district?: string;
    ward?: string;
    category?: string;
    amenities?: string[];
    status?: "pending" | "approved" | "rejected" | "expired";
};

export type UpdatePostDto = CreateRoomDto & {
    status?: "pending" | "approved" | "rejected" | "expired";
};

export type Appointment = {
    id: string;
    appointmentDateTime: string;
    user: User;
    host: User;
    appointmentPosts: {
        id: string;
        createdAt: string;
        post: Post;
    }[];
    status: "pending" | "confirmed" | "rejected" | "cancelled";
};

export type CreateAppointmentDto = {
    appointmentDateTime: string;
    hostId: string;
    postId: string;
};

export type updateAppointmentDto = {
    appointmentDateTime?: string;
    note?: string;
    status?: "pending" | "confirmed" | "rejected" | "cancelled";
};

export type AppointmentFilter = {
    page?: number;
    limit?: number;
    userId?: string;
    hostId?: string;
    appointmentDateTime?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    status?: "pending" | "confirmed" | "rejected" | "cancelled";
};

export type UserNotification = {
    id: string;
    isRead: boolean;
    createdAt: string;
    user: User;
};

export type Notification = {
    id: string;
    title: string;
    message: string;
    type: "appointment" | "system" | "message";
    userNotifications: UserNotification[];
    createdAt: string;
};

export type NotificationFilter = {
    keyword?: string;
    type?: "appointment" | "system" | "message";
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};
