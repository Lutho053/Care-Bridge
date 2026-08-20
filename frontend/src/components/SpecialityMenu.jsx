import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="bg-white px-4 py-14 sm:px-6 sm:py-20 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14">

          <div className="max-w-2xl">

            {/* LABEL */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Healthcare made easier
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Find the right specialist
              <span className="block text-blue-600 mt-1">
                for your needs.
              </span>
            </h1>

            <p className="mt-4 text-gray-500 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 max-w-xl">
              Explore medical specialities and connect with qualified
              healthcare professionals who can help you get the care you need.
            </p>

          </div>

          {/* VIEW ALL */}
          <Link
            to="/find-doctor"
            onClick={() => scrollTo(0, 0)}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-full
              border
              border-gray-200
              text-gray-700
              text-sm
              font-medium
              hover:border-blue-500
              hover:text-blue-600
              hover:bg-blue-50
              transition
              w-fit
            "
          >
            Find a doctor
            <span>→</span>
          </Link>

        </div>


        {/* SPECIALITY GRID */}
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-3
          sm:gap-4
          md:gap-5
        ">

          {specialityData.map((item, index) => (

            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              className="
                group
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-4
                sm:p-5
                md:p-6
                min-h-[145px]
                sm:min-h-[170px]
                md:min-h-[190px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                hover:border-blue-100
                transition
              "
            >

              {/* ICON */}
              <div className="
                w-14
                h-14
                sm:w-18
                sm:h-18
                md:w-24
                md:h-24
                rounded-2xl
                bg-blue-50
                flex
                items-center
                justify-center
                mb-3
                sm:mb-5
                group-hover:bg-white
                group-hover:shadow-md
                transition
              ">

                <img
                  src={item.image}
                  alt={item.speciality}
                  className="
                    w-9
                    h-9
                    sm:w-11
                    sm:h-11
                    md:w-14
                    md:h-14
                    object-contain
                    group-hover:scale-110
                    transition-transform
                  "
                />

              </div>

              {/* SPECIALITY */}
              <p className="
                text-xs
                sm:text-sm
                md:text-base
                font-semibold
                text-gray-800
                group-hover:text-blue-600
                transition-colors
              ">
                {item.speciality}
              </p>

            </Link>

          ))}

        </div>


        {/* BOTTOM CTA */}
        <div className="
          mt-10
          sm:mt-14
          rounded-2xl
          sm:rounded-3xl
          bg-blue-600
          px-5
          py-6
          sm:px-7
          sm:py-8
          md:px-10
          flex
          flex-col
          md:flex-row
          items-start
          md:items-center
          justify-between
          gap-5
          text-white
          shadow-lg
        ">

          <div>

            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              Not sure which doctor you need?
            </h2>

            <p className="mt-2 text-blue-100 text-xs sm:text-sm md:text-base leading-5 sm:leading-6">
              Tell CareBridge what you need help with and we will help you
              discover relevant healthcare professionals.
            </p>

          </div>

          <Link
            to="/find-doctor"
            onClick={() => scrollTo(0, 0)}
            className="
              inline-flex
              items-center
              gap-2
              whitespace-nowrap
              bg-white
              text-blue-600
              px-5
              py-2.5
              rounded-full
              text-sm
              font-semibold
              hover:bg-blue-50
              hover:shadow-lg
              transition
            "
          >
            We can help
            <span>→</span>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default SpecialityMenu;