export const getCookieDate = () => {
    const result = new Date();
    result.setDate(result.getDate() + 10);
    return result;
};
