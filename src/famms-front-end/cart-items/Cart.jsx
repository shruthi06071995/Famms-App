import { useSelector, useDispatch } from "react-redux";

function Cart() {

  const cartItems = useSelector(
    state => state?.cart?.cartItems || []
  );
  const dispatch = useDispatch();

  // TOTAL PRICE 
  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.price * (item.quantity || 1);
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
              <small>₹ {item.price} * {item.quantity || 1}</small>
              <h6 className="mt-2">₹ {item.price * (item.quantity || 1)}</h6>
            </div>

            <div className="d-flex align-items-center gap-2">

              {/* DECREMENT  */}
              <button
                className="btn btn-sm btn-dark"
                onClick={() =>
                  dispatch({
                    type: "DECREMENT_QTY",
                    payload: index,
                  })
                }
              >
                -
              </button>

              {/* QUANTITY */}
              <span>{item.quantity || 1}</span>

              {/* INCREMENT */}
              <button
                className="btn btn-sm btn-dark"
                onClick={() =>
                  dispatch({
                    type: "INCREMENT_QTY",
                    payload: index,
                  })
                }
              >
                +
              </button>

              {/* REMOVE */}
              <button
                className="btn btn-sm btn-danger ms-3"
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