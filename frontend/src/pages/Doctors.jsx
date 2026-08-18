import { useContext, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])

  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)



  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
    "Psychiatrist",
    "Cardiologist",
    "Orthopedic Specialist",
    "Dentist",
    
  ]



  useEffect(()=>{

    if(speciality){

      setFilterDoc(
        doctors.filter(
          doc => doc.speciality === speciality
        )
      )

    }else{

      setFilterDoc(doctors)

    }


  },[doctors,speciality])





  return (

    <div className="
    bg-gray-50
    min-h-screen
    px-6
    md:px-12
    lg:px-20
    py-16
    ">





      {/* HEADER */}


      <div className="
      mb-12
      ">


        <p className="
        text-blue-600
        uppercase
        tracking-widest
        text-sm
        ">

          Find specialists

        </p>


        <h1 className="
        text-4xl
        md:text-5xl
        font-bold
        mt-3
        ">

          Book your doctor

        </h1>



        <p className="
        text-gray-600
        mt-4
        ">

          Browse through our trusted healthcare
          professionals and schedule an appointment.

        </p>


      </div>







      <div className="
      flex
      flex-col
      lg:flex-row
      gap-10
      ">





        {/* FILTER */}


        <aside className="
        lg:w-72
        ">


          <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          ">



            <h2 className="
            font-bold
            text-lg
            mb-5
            ">

              Specialities

            </h2>




            <div className="
            space-y-3
            ">



              {
                specialities.map((item,index)=>(


                  <button

                  key={index}

                  onClick={()=>{

                    item === speciality
                    ? navigate("/doctors")
                    : navigate(`/doctors/${item}`)

                  }}


                  className={`

                  w-full
                  text-left
                  px-5
                  py-3
                  rounded-xl
                  transition

                  ${
                    speciality === item
                    ?
                    "bg-blue-600 text-white"
                    :
                    "bg-gray-50 text-gray-600 hover:bg-blue-50"
                  }

                  `}


                  >

                    {item}


                  </button>


                ))
              }


            </div>


          </div>


        </aside>










        {/* DOCTORS */}



        <div className="
        flex-1
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
        ">



          {
            filterDoc.map((item,index)=>(


              <div

              key={item._id || index}

              onClick={()=>{

                navigate(`/appointment/${item._id}`)

                scrollTo(0,0)

              }}


              className="
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-2
              transition
              cursor-pointer
              ">



                {/* IMAGE */}



                <div className="
                bg-blue-50
                relative
                ">


                  <img

                  src={item.image}

                  alt={item.name}

                  className="
                  w-full
                  h-72
                  object-cover
                  "

                  />




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
                  text-lg
                  font-bold
                  ">

                    {item.name}

                  </h2>



                  <p className="
                  text-blue-600
                  text-sm
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


      </div>



    </div>


  )

}


export default Doctors