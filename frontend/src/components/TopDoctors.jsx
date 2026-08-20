import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const TopDoctors = () => {

  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)

  return (

    <section className="
      px-4
      sm:px-6
      md:px-12
      lg:px-20
      py-12
      sm:py-16
      lg:py-20
    ">

      {/* HEADER */}

      <div className="
        flex
        flex-col
        md:flex-row
        md:justify-between
        md:items-end
        gap-4
        mb-8
        sm:mb-10
      ">

        <div>

          <h1 className="
            text-3xl
            sm:text-4xl
            font-bold
            text-gray-900
          ">
            Meet our top specialists
          </h1>

          <p className="
            mt-2
            text-blue-600
            text-sm
            sm:text-lg
            font-medium
          ">
            Experienced doctors ready to help you.
          </p>

        </div>

        {/* DESKTOP BUTTON */}

        <button
          onClick={() => {
            navigate("/doctors")
            scrollTo(0, 0)
          }}
          className="
            hidden
            md:block
            text-blue-600
            font-medium
            hover:underline
          "
        >
          View all doctors →
        </button>

      </div>


      {/* DOCTORS GRID */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        gap-4
        sm:gap-6
        lg:gap-8
      ">

        {doctors?.slice(0, 10).map((item, index) => (

          <div
            key={item._id || index}
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className="
              bg-white
              rounded-2xl
              sm:rounded-3xl
              overflow-hidden
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              cursor-pointer
            "
          >

            {/* IMAGE */}

            <div className="
              relative
              bg-gray-100
            ">

              <img
                src={item.image}
                alt={item.name}
                className="
                  w-full
                  h-[260px]
                  sm:h-[320px]
                  lg:h-[330px]
                  object-cover
                "
              />


              {/* AVAILABLE */}

              <div className="
                absolute
                bottom-3
                left-3
                bg-white/95
                backdrop-blur-sm
                rounded-full
                px-3
                py-1.5
                flex
                items-center
                gap-2
                text-xs
                font-medium
                shadow-sm
              ">

                <span
                  className={`
                    w-2
                    h-2
                    rounded-full
                    ${item.available
                      ? "bg-green-500"
                      : "bg-red-500"
                    }
                  `}
                />

                {item.available
                  ? "Available"
                  : "Not Available"
                }

              </div>

            </div>


            {/* DETAILS */}

            <div className="
  flex
  items-center
  justify-between
  gap-3
  mt-1
">

  <p className="
    text-blue-600
    text-sm
    sm:text-lg
    font-medium
  ">
    {item.speciality}
  </p>

  {/* AVAILABLE */}

  <div className="
    flex
    items-center
    gap-1.5
    bg-gray-50
    px-2.5
    py-1
    rounded-full
    text-xs
    font-medium
    whitespace-nowrap
  ">

    <span
      className={`
        w-2
        h-2
        rounded-full
        ${item.available
          ? "bg-green-500"
          : "bg-red-500"
        }
      `}
    />

    {item.available ? "Available" : "Not Available"}

  </div>

</div>

          </div>

        ))}

      </div>


      {/* MOBILE BUTTON */}

      <button
        onClick={() => {
          navigate("/doctors")
          scrollTo(0, 0)
        }}
        className="
          md:hidden
          block
          mx-auto
          mt-8
          bg-blue-600
          text-white
          px-6
          py-2.5
          rounded-full
          text-sm
          font-medium
        "
      >
        View all doctors
      </button>

    </section>

  )
}

export default TopDoctors