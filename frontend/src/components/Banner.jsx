import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        px-4
        sm:px-6
        md:px-12
        lg:px-20
        py-12
        sm:py-16
        lg:py-20
      "
    >
      <div
        className="
          bg-gradient-to-r
          from-blue-600
          to-blue-500
          rounded-3xl
          md:rounded-[40px]
          overflow-hidden
          grid
          md:grid-cols-2
          items-center
        "
      >

        {/* LEFT */}

        <div
          className="
            p-6
            sm:p-8
            md:p-12
            lg:p-16
          "
        >

          <p
            className="
              text-blue-100
              text-xs
              sm:text-sm
              mb-3
              sm:mb-4
            "
          >
            Start your health journey
          </p>


          <h1
            className="
              text-white
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              leading-tight
            "
          >
            Your doctor is
            <br />
            one click away.
          </h1>


          <p
            className="
              text-blue-100
              mt-4
              sm:mt-5
              max-w-md
              text-sm
              sm:text-base
              leading-6
            "
          >
            Create an account and book appointments with trusted healthcare
            professionals anytime.
          </p>


          {/* BENEFITS */}

          <div
            className="
              mt-6
              sm:mt-8
              space-y-2
              sm:space-y-3
              text-white
              text-xs
              sm:text-sm
            "
          >

            <p>✓ Verified doctors</p>

            <p>✓ Easy online booking</p>

            <p>✓ Secure healthcare access</p>

          </div>


          {/* CTA */}

          <button
            onClick={() => {
              navigate("/login");
              window.scrollTo(0, 0);
            }}
            className="
              mt-6
              sm:mt-8
              bg-white
              text-blue-600
              px-7
              sm:px-10
              py-3
              sm:py-4
              rounded-full
              font-semibold
              text-sm
              sm:text-base
              hover:scale-105
              transition
            "
          >
            Create Account
          </button>

        </div>


        {/* RIGHT IMAGE */}

        <div
          className="
            hidden
            md:flex
            justify-end
            items-end
            h-full
          "
        >

          <img
            src={assets.pointing_image}
            className="
              w-full
              max-w-2xl
              object-contain
            "
            alt="appointment"
          />

        </div>

      </div>
    </section>
  );
};

export default Banner;