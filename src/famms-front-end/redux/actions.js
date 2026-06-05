//add to cart action

export const addToCart = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: product
    };
};

//Remove from cart action

export const removeFromCart = (id) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: id
    };
};