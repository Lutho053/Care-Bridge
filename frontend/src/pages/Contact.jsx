import { assets } from "../assets/assets"
import { Link } from "react-router-dom"

const Contact = () => {

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


      <section className="
      text-center
      mb-16
      ">


        <p className="
        text-blue-600
        uppercase
        tracking-widest
        text-sm
        mb-3
        ">

          Contact CareBridge

        </p>



        <h1 className="
        text-4xl
        md:text-5xl
        font-bold
        text-gray-900
        ">

          We are here to help

        </h1>



        <p className="
        mt-4
        text-gray-600
        max-w-xl
        mx-auto
        ">

          Have questions about appointments or healthcare services?
          Our team is ready to assist you.

        </p>


      </section>









      {/* CONTACT SECTION */}


      <section className="
      bg-white
      rounded-[40px]
      shadow-sm
      p-8
      md:p-12
      grid
      md:grid-cols-2
      gap-12
      items-center
      ">



        {/* IMAGE */}


        <div>


          <img

          src={assets.contact_image}

          alt="Contact CareBridge"

          className="
          rounded-3xl
          w-full
          h-[450px]
          object-cover
          "

          />


        </div>









        {/* DETAILS */}


        <div className="
        space-y-8
        ">



          <div>


            <h2 className="
            text-2xl
            font-bold
            text-gray-900
            mb-3
            ">

              Our Office

            </h2>



            <p className="
            text-gray-600
            leading-relaxed
            ">

              3 LERWANA STREET
              <br/>

              VERGENOEG kIMBERLEY

            </p>


          </div>







          <div className="
          grid
          md:grid-cols-2
          gap-5
          ">



            <div className="
            bg-gray-50
            rounded-2xl
            p-5
            ">


              <h3 className="
              font-semibold
              text-gray-900
              ">

                Phone

              </h3>


              <p className="text-gray-600 mt-2">

                069 579 0416

              </p>


            </div>







            <div className="
            bg-gray-50
            rounded-2xl
            p-5
            ">


              <h3 className="
              font-semibold
              text-gray-900
              ">

                Email

              </h3>


              <p className="text-gray-600 mt-2">

                support@carebridge.com

              </p>


            </div>


          </div>








          {/* CAREERS */}



          <div className="
          border-t
          pt-8
          ">



            <h2 className="
            text-2xl
            font-bold
            text-gray-900
            ">

              Careers at CareBridge

            </h2>



            <p className="
            text-gray-600
            mt-3
            ">

              Join our mission to improve healthcare
              through technology.

            </p>





            <button

            className="
            mt-6
            bg-blue-600
            text-white
            px-8
            py-3
            rounded-full
            hover:bg-blue-700
            transition
            ">

              Explore Jobs

            </button>



          </div>



        </div>




      </section>






      {/* BOTTOM CTA */}



      <section className="
      mt-16
      bg-blue-600
      rounded-[40px]
      p-10
      text-center
      text-white
      ">



        <h2 className="
        text-3xl
        font-bold
        ">

          Need medical assistance?

        </h2>



        <p className="
        mt-3
        text-blue-100
        ">

          Book an appointment with a trusted doctor today.

        </p>




        <Link
        to="/doctors"

        className="
        mt-6
        bg-white
        text-blue-600
        px-8
        py-3
        rounded-full
        font-semibold
        inline-flex
        items-center
        gap-2
        hover:bg-gray-100
        transition
        ">

          Find a Doctor

        </Link>



      </section>



    </div>

  )

}


export default Contact