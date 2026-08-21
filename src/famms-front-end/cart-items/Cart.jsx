import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart() {

  const cartItems = useSelector(
    state => state?.cart?.cartItems || []
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            <div className="d-flex align-items-center">

              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "20px",
                }}
              />

              <div>

                <h5>{item.title}</h5>

                <p className="mb-1">
                  Price : ₹ {item.price}
                </p>

                <p className="mb-1">
                  Stock : {item.countInStock}
                </p>

                <h6 className="text-danger">
                  Total : ₹ {item.price * (item.quantity || 1)}
                </h6>

              </div>

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

        <div className="text-end mt-3">

          <button
            className="btn btn-danger"
            onClick={() => {
              console.log("Button Clicked");
              navigate("/checkout");
            }}
          >
            Proceed to Checkout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Cart;