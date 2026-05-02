import { useSelector, useDispatch } from "react-redux";

function Cart() {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // TOTAL PRICE 
  const totalAmount = cartItems.reduce(
    (acc, item) => {
      return acc + Number(item.price);
    }, 0);

  return (
    <div className="container mt-5">

      <h2 className="mb-4">Shopping Cart</h2>

      <div className="bg-white p-4 shadow rounded">

        {cartItems.length === 0 && (
          <p>Your cart is empty</p>
        )}

        {cartItems.map((item, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center border-bottom py-3"
          >
            <div>
              <h6>{item.title}</h6>
              <small>₹ {item.price}</small>
            </div>

            <button
              className="btn btn-sm btn-danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: index
                })
              }
            >
              Remove
            </button>
          </div>
        ))}

        <div className="mt-4 text-end">
          <h4>Total: ₹ {totalAmount.toFixed(2)}</h4>
        </div>

      </div>
    </div>
  );
}

export default Cart;