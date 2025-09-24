import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

export const resolveAddress = (
    city: string,
    district: string,
    ward: string,
    street: string
) => {
    return `${street ? `${street}, ` : ""}${ward ? `${ward.split("|")[1]}, ` : ""}${district ? `${district.split("|")[1]}, ` : ""}${city ? `${city.split("|")[1]}` : ""}`;
};
export const formatCurrency = (
    amount: number,
    options: { currency?: string; locale?: string } = {}
): string => {
    const { currency = "VND", locale = "vi-VN" } = options;

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(amount);
};

export const getTikTokVideoId = (url: string): string | null => {
    const match = url.match(/video\/(\d+)/);
    return match ? match[1] : null;
};

export const formatPostDate = (postDateStr: string) => {
    const postDate = dayjs(postDateStr);
    const now = dayjs();

    const isToday = postDate.isSame(now, "day");
    const isYesterday = postDate.isSame(now.subtract(1, "day"), "day");

    if (isToday) {
        return "Hôm nay";
    }

    if (isYesterday) {
        return "Hôm qua";
    }

    return postDate.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
};

// Capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
};

export const formatToVietnamTime = (
    utcDate: string | Date,
    formatStr: string = "dddd, DD/MM/YYYY HH:mm"
): string => {
    return dayjs(utcDate).tz("Asia/Ho_Chi_Minh").format(formatStr);
};
