import { useEffect, useState } from "react";

function Orders() {

    const [orders, setOrders] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            const data = await response.json();

            setOrders(data);

        } catch (error) {

            console.log(error);

        }

    };

    const markDelivered = async (id) => {

        const confirmDeliver = window.confirm(
            "Mark this order as delivered?"
        );

        if (!confirmDeliver) return;

        try {

            const response = await fetch(
                `http://localhost:5000/api/orders/${id}/deliver`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Order Delivered Successfully");

                fetchOrders();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">All Orders</h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Order ID</th>

                        <th>Customer</th>

                        <th>Email</th>

                        <th>Total</th>

                        <th>Date</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr key={order._id}>

                            <td>{order._id.slice(-6)}</td>

                            <td>{order.user?.name}</td>

                            <td>{order.user?.email}</td>

                            <td>₹ {order.totalPrice}</td>

                            <td>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>

                            <td>
                                {order.isDelivered ? (
                                    <span className="badge bg-success">
                                        Delivered
                                    </span>
                                ) : (
                                    <span className="badge bg-warning text-dark">
                                        Pending
                                    </span>
                                )}
                            </td>

                            <td>

                                {!order.isDelivered ? (

                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => markDelivered(order._id)}
                                    >
                                        Mark Delivered
                                    </button>

                                ) : (

                                    <button
                                        className="btn btn-secondary btn-sm"
                                        disabled
                                    >
                                        Delivered
                                    </button>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Orders;