import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                name: String,
                image: String,
                price: Number,
                quantity: Number,
            },
        ],

        shippingAddress: {
            fullName: String,
            email: String,
            phone: String,
            address: String,
            city: String,
            state: String,
            pincode: String,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        isDelivered: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;