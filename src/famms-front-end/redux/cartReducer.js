
const initialState = {
  cartItems: []
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };

    case "INCREMENT_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item, index) =>
          index === action.payload
            ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
            : item
        ),
      };

    case "DECREMENT_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item, index) =>
          index === action.payload
            ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
            : item
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (_, index) => index !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
