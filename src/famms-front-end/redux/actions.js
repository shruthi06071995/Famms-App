// Add to cart action
export const addToCart = (product, quantity) => {
    return {
        type: "ADD_TO_CART",
        payload: {
            product,
            quantity
        },
    };
};

// Remove from cart action
export const removeFromCart = (id) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: id
    };
};