import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div
      className="
        bg-gray-50
        min-h-screen
        px-4
        sm:px-6
        md:px-12
        lg:px-20
        py-10
        sm:py-12
        lg:py-16
      "
    >

      {/* HEADER */}

      <section
        className="
          text-center
          mb-10
          sm:mb-14
          lg:mb-16
        "
      >

        <p
          className="
            text-blue-600
            uppercase
            tracking-widest
            text-xs
            sm:text-sm
            font-medium
            mb-3
          "
        >
          Contact CareBridge
        </p>

        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            text-gray-900
          "
        >
          We are here to help
        </h1>

        <p
          className="
            mt-3
            sm:mt-4
            text-gray-600
            text-sm
            sm:text-base
            max-w-xl
            mx-auto
            leading-relaxed
          "
        >
          Have questions about appointments or healthcare services?
          Our team is ready to assist you.
        </p>

      </section>


      {/* CONTACT SECTION */}

      <section
        className="
          bg-white
          rounded-3xl
          md:rounded-[40px]
          shadow-sm
          p-5
          sm:p-8
          md:p-12
          grid
          md:grid-cols-2
          gap-8
          md:gap-12
          items-center
        "
      >

        {/* IMAGE */}

        <div>

          <img
            src={assets.contact_image}
            alt="Contact CareBridge"
            className="
              rounded-2xl
              md:rounded-3xl
              w-full
              h-[280px]
              sm:h-[360px]
              md:h-[450px]
              object-cover
            "
          />

        </div>


        {/* DETAILS */}

        <div
          className="
            space-y-7
            sm:space-y-8
          "
        >

          {/* OFFICE */}

          <div>

            <h2
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-gray-900
                mb-2
                sm:mb-3
              "
            >
              Our Office
            </h2>

            <p
              className="
                text-gray-600
                text-sm
                sm:text-base
                leading-relaxed
              "
            >
              3 Lerwana Street
              <br />
              Vergenoeg, Kimberley
            </p>

          </div>


          {/* PHONE + EMAIL */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-3
              sm:gap-5
            "
          >

            <div
              className="
                bg-gray-50
                rounded-2xl
                p-4
                sm:p-5
              "
            >

              <h3
                className="
                  font-semibold
                  text-gray-900
                  text-sm
                  sm:text-base
                "
              >
                Phone
              </h3>

              <p
                className="
                  text-gray-600
                  text-sm
                  sm:text-base
                  mt-1
                  sm:mt-2
                "
              >
                069 579 0416
              </p>

            </div>


            <div
              className="
                bg-gray-50
                rounded-2xl
                p-4
                sm:p-5
              "
            >

              <h3
                className="
                  font-semibold
                  text-gray-900
                  text-sm
                  sm:text-base
                "
              >
                Email
              </h3>

              <p
                className="
                  text-gray-600
                  text-sm
                  sm:text-base
                  mt-1
                  sm:mt-2
                  break-words
                "
              >
                support@carebridge.com
              </p>

            </div>

          </div>


          {/* CAREERS */}

          <div
            className="
              border-t
              pt-6
              sm:pt-8
            "
          >

            <h2
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-gray-900
              "
            >
              Careers at CareBridge
            </h2>

            <p
              className="
                text-gray-600
                text-sm
                sm:text-base
                mt-2
                sm:mt-3
                leading-relaxed
              "
            >
              Join our mission to improve healthcare
              through technology.
            </p>

            <button
              className="
                mt-5
                sm:mt-6
                bg-blue-600
                text-white
                px-7
                sm:px-8
                py-3
                rounded-full
                text-sm
                sm:text-base
                hover:bg-blue-700
                transition
              "
            >
              Explore Jobs
            </button>

          </div>

        </div>

      </section>


      {/* BOTTOM CTA */}

      <section
        className="
          mt-10
          sm:mt-14
          lg:mt-16
          bg-blue-600
          rounded-3xl
          md:rounded-[40px]
          p-7
          sm:p-10
          text-center
          text-white
        "
      >

        <h2
          className="
            text-2xl
            sm:text-3xl
            font-bold
          "
        >
          Need medical assistance?
        </h2>

        <p
          className="
            mt-2
            sm:mt-3
            text-blue-100
            text-sm
            sm:text-base
            max-w-md
            mx-auto
          "
        >
          Book an appointment with a trusted doctor today.
        </p>

        <Link
          to="/doctors"
          className="
            mt-5
            sm:mt-6
            bg-white
            text-blue-600
            px-7
            sm:px-8
            py-3
            rounded-full
            font-semibold
            text-sm
            sm:text-base
            inline-flex
            items-center
            gap-2
            hover:bg-gray-100
            transition
          "
        >
          Find a Doctor
        </Link>

      </section>

    </div>
  );
};

export default Contact;