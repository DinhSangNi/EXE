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
