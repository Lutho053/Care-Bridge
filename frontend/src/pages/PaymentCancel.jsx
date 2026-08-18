import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {

      navigate("/my-appointments");

    }, 5000);

    return () => clearTimeout(timer);

  }, [navigate]);


  return (

    <div className="
    min-h-[70vh]
    flex
    items-center
    justify-center
    px-6
    ">

      <div className="
      bg-white
      shadow-lg
      rounded-3xl
      p-10
      text-center
      max-w-md
      w-full
      ">

        <div className="
        w-20
        h-20
        bg-red-100
        text-red-600
        rounded-full
        flex
        items-center
        justify-center
        text-4xl
        mx-auto
        mb-6
        ">

          ✕

        </div>


        <h1 className="
        text-3xl
        font-bold
        text-gray-800
        ">

          Payment Cancelled

        </h1>


        <p className="
        mt-4
        text-gray-600
        ">

          Your payment was cancelled and the appointment was not paid.

        </p>


        <p className="
        mt-2
        text-sm
        text-gray-500
        ">

          You will be redirected to your appointments shortly.

        </p>


        <button

          onClick={() => navigate("/my-appointments")}

          className="
          mt-8
          bg-blue-600
          text-white
          px-8
          py-3
          rounded-full
          hover:bg-blue-700
          transition
          "

        >

          View My Appointments

        </button>


      </div>

    </div>

  );

};


export default PaymentCancel;