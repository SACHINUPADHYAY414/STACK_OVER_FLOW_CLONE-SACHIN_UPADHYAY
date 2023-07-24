import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscription, handlePayment } from "../../actions/subscriptions";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import "./Subscription.css";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();

  const subscription = useSelector(
    (state) => state.currentUserReducer
  )?.subscription;

  const { isPaid } = useSelector((state) => state.subscriptionReducer);

  const navigate = useNavigate();
  const handleSub = async (amount) => {
    if (!User) {
      navigate("/Auth");
    } else if (amount !== 0) {
      dispatch(handlePayment(User?._id, amount));
    }
  };

  useEffect(() => {
    isPaid && dispatch(checkSubscription(User?._id));
  }, [isPaid, dispatch, User?._id]);

  const options = [
    {
      value: 0,
      label: "Free",
      description: "can ask 1 question per day",
    },
    {
      value: 100,
      label: "Silver",
      description: "can ask upto 5 question per day",
    },
    {
      value: 1000,
      label: "Gold",
      description: "can ask unlimit question per day",
    },
  ];

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <h2>Choose your plan</h2>
        <div className="subs-container">
          {options.map(({ label, value, description }) => (
            <section className="plan-container" key={label}>
              <div className="plan-container-title">
                <h3>{label}</h3>
                <h4>{`₹ ${value}`}</h4>
              </div>
              <p>{description}</p>
              <button
                onClick={() => handleSub(value)}
                disabled={
                  subscription && subscription === label.toLocaleLowerCase()
                }
              >
                {subscription
                  ? label.toLocaleLowerCase() === subscription
                    ? "subscripted"
                    : "do subscription"
                  : "do subscription"}
              </button>
            </section>
          ))}
        </div>
        <p className="text-card-details">
          Test card details <br />
          <br />
          card number: 4111 1111 1111 1111 <br />
          card expiry date: 10/45 <br /> card cvv: 123 <br /> OTP: 123456 <br />
          <br />
          This card details for only testing purpose
        </p>
      </div>
    </div>
  );
};

export default Subscription;
