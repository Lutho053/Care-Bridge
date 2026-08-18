import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="relative overflow-hidden bg-white px-6 py-24 md:px-12 lg:px-20"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">

          <div className="max-w-2xl">

            {/* SMALL LABEL */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>

              Healthcare made easier
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Find the right specialist
              <span className="block text-blue-600 mt-1">
                for your needs.
              </span>
            </h1>

            <p className="mt-5 text-gray-500 text-base md:text-lg leading-7 max-w-xl">
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
              px-5
              py-3
              rounded-full
              border
              border-gray-200
              text-gray-700
              font-medium
              hover:border-blue-500
              hover:text-blue-600
              hover:bg-blue-50
              transition-all
              duration-300
              w-fit
            "
          >
            Find a doctor

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>


        {/* SPECIALITY GRID */}
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-4
          md:gap-5
        ">

          {specialityData.map((item, index) => (

            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-5
                md:p-6
                min-h-[190px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                hover:border-blue-100
                transition-all
                duration-300
              "
            >

              {/* HOVER BACKGROUND */}
              <div className="
                absolute
                inset-0
                bg-gradient-to-br
                from-blue-50
                via-white
                to-indigo-50
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              " />


              {/* ICON */}
              <div className="
                relative
                z-10
                w-20
                h-20
                md:w-24
                md:h-24
                rounded-2xl
                bg-blue-50
                flex
                items-center
                justify-center
                mb-5
                group-hover:bg-white
                group-hover:shadow-md
                transition-all
                duration-300
              ">

                <img
                  src={item.image}
                  alt={item.speciality}
                  className="
                    w-12
                    h-12
                    md:w-14
                    md:h-14
                    object-contain
                    group-hover:scale-110
                    transition-transform
                    duration-300
                  "
                />

              </div>


              {/* SPECIALITY NAME */}
              <p className="
                relative
                z-10
                text-sm
                md:text-base
                font-semibold
                text-gray-800
                group-hover:text-blue-600
                transition-colors
                duration-300
              ">
                {item.speciality}
              </p>


              {/* ARROW */}
              <div className="
                relative
                z-10
                mt-3
                text-blue-600
                opacity-0
                translate-y-2
                group-hover:opacity-100
                group-hover:translate-y-0
                transition-all
                duration-300
              ">
                Find doctors →
              </div>

            </Link>

          ))}

        </div>


        {/* BOTTOM CTA */}
        <div className="
          mt-14
          rounded-3xl
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          px-7
          py-8
          md:px-10
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-6
          text-white
          shadow-lg
        ">

          <div>

            <h2 className="text-xl md:text-2xl font-bold">
              Not sure which doctor you need?
            </h2>

            <p className="mt-2 text-blue-100 text-sm md:text-base">
              Tell CareBridge what you need help with and we will help you
              discover relevant healthcare professionals.
            </p>

          </div>


          <Link
            to="/find-doctor"
            onClick={() => scrollTo(0, 0)}
            className="
              flex
              items-center
              gap-2
              whitespace-nowrap
              bg-white
              text-blue-600
              px-6
              py-3
              rounded-full
              font-semibold
              hover:bg-blue-50
              hover:shadow-lg
              transition-all
              duration-300
            "
          >
            Find the right doctor
            <span>→</span>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default SpecialityMenu