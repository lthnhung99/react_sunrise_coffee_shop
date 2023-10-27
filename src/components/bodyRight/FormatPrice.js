const formatPrice = (price) => {
    if (typeof price !== 'number') {
        return price;
    }
    const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formattedPrice;
};

export default formatPrice;