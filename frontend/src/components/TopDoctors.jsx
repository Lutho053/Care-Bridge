import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const TopDoctors = () => {

  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)


  return (

    <section className="
    px-6
    md:px-12
    lg:px-20
    py-20
    ">


      {/* HEADER */}

      <div className="
      flex
      justify-between
      items-end
      mb-10
      ">


        <div>

          <h1 className="
          text-4xl
          font-bold
          text-gray-900
          ">

            Meet our top specialists

          </h1>


          <p className="
          mt-3
          text-blue-600
          text-lg
          font-medium
          ">

            Experienced doctors ready to help you.

          </p>


        </div>



        <button

        onClick={()=> {
          navigate("/doctors")
          scrollTo(0,0)
        }}

        className="
        hidden
        md:block
        text-blue-600
        font-medium
        hover:underline
        ">

          View all doctors →

        </button>


      </div>






      {/* DOCTORS GRID */}


      <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      gap-8
">
        {
          doctors?.slice(0,10).map((item,index)=>(


            <div key={item._id || index} onClick={()=>{navigate(`/appointment/${item._id}`) 
              scrollTo(0,0)}}className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">


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
                h-82
                object-cover
                "

                />



                {/* AVAILABLE */}

                <div className="
absolute
top-4
right-4
bg-white
rounded-full
px-3
py-1
flex
items-center
gap-2
text-xs
shadow
">

<span
className={`
w-2
h-2
rounded-full
${item.available ? "bg-green-500" : "bg-red-500"}
`}
>

</span>

{item.available ? "Available" : "Not Available"}

</div>

              </div>

              {/* DETAILS */}


              <div className="
              p-5
              ">

                <h2 className="
                text-2xl
                font-bold
                text-gray-900
                ">

                  {item.name}

                </h2>

                <p className="
                text-blue-600
                text-lg
                font-medium
                mt-1
                ">

                  {item.speciality}

                </p>

                <div className="
                flex
                justify-between
                items-center
                mt-5
                ">

                  

                  <button

                  className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  ">

                    Book

                  </button>

                </div>

              </div>

            </div>

          ))
        }

      </div>

      {/* MOBILE BUTTON */}

      <button

      onClick={()=>{

        navigate("/doctors")
        scrollTo(0,0)

      }}

      className="
      md:hidden
      block
      mx-auto
      mt-10
      bg-blue-600
      text-white
      px-8
      py-3
      rounded-full
      ">

        View all doctors

      </button>


    </section>

  )

}


export default TopDoctors