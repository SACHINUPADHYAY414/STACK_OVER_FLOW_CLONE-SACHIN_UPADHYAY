import * as api from "../api";
import { useLocalStorage } from "../hook/useLocalStorage";
import { setCurrentUser } from "./currentUser";

export const handlePayment = (id, amount) => async (dispatch) => {
  try {
    const {
      data: { order },
    } = await api.order(amount);
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "StackOverflow Plan",
      description: "Tutorial of RazorPay",
      image:
        "https://w7.pngwing.com/pngs/784/593/png-transparent-answer-coding-hexagon-media-networking-social-stackoverflow-hexagon-social-medias-icon-thumbnail.png",
      order_id: order.id,
      handler: async function (response) {
        const result = await api.verifyOrder({ id, amount, response });
        console.log(result);
        if (result.data.success !== true) {
          alert("The Plan has failed to activate!!! Contact us later.");
        } else {
          dispatch({ type: "SET_IS_PAID", payload: true });
        }
      },
      prefill: {
        name: "Sachin upadhyay",
        email: "upadhyaysachin2810@gmail.com",
        contact: "7294890821",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.log(err);
  }
};

export const checkSubscription = (id) => async (dispatch) => {
  try {
    const { data } = await api.checkSubs(id);
    dispatch({ type: "UPDATE_AUTH", data: data.user });
    useLocalStorage(data.user);
    dispatch(setCurrentUser({ result: data.user }));
  } catch (err) {
    console.log(err);
  }
};
