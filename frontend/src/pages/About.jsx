import { assets } from "../assets/assets"

const About = () => {

  return (

    <div className="
    bg-gray-50
    min-h-screen
    text-gray-900
    px-6
    md:px-12
    lg:px-20
    py-16
    ">


      {/* HERO SECTION */}

      <section className="
      grid
      md:grid-cols-2
      gap-12
      items-center
      ">


        {/* LEFT */}

        <div>


          <p className="
          text-blue-600
          uppercase
          tracking-widest
          text-sm
          mb-4
          ">

            About CareBridge

          </p>




          <h1 className="
          text-5xl
          lg:text-6xl
          font-bold
          leading-tight
          text-gray-900
          ">

            Connecting
            <br/>

            patients with
            <br/>

            better healthcare.

          </h1>




          <p className="
          mt-6
          text-gray-600
          text-lg
          max-w-xl
          ">

            CareBridge makes healthcare simple by
            connecting patients with trusted doctors,
            making appointments faster, easier and more
            convenient.

          </p>


        </div>





        {/* RIGHT */}

        <div>


          <img

          src={assets.about_image}

          alt="About CareBridge"

          className="
          rounded-[40px]
          shadow-xl
          w-full
          h-[500px]
          object-cover
          "

          />


        </div>



      </section>









      {/* MISSION + VISION */}


      <section className="
      mt-24
      bg-white
      rounded-[40px]
      shadow-sm
      p-8
      md:p-14
      grid
      md:grid-cols-2
      gap-10
      ">



        <div>

          <h2 className="
          text-3xl
          font-bold
          mb-5
          ">

            Our Mission

          </h2>


          <p className="
          text-gray-600
          leading-relaxed
          ">

            We believe healthcare should be accessible,
            convenient and stress-free. CareBridge helps
            patients find trusted doctors and manage
            appointments through a simple digital
            healthcare experience.

          </p>


        </div>







        <div>


          <h2 className="
          text-3xl
          font-bold
          mb-5
          ">

            Our Vision

          </h2>



          <p className="
          text-gray-600
          leading-relaxed
          ">

            Our vision is to create a connected healthcare
            ecosystem where patients and doctors can
            communicate easily through technology.

          </p>



        </div>



      </section>









      {/* STATS */}


      <section className="
      grid
      grid-cols-2
      md:grid-cols-4
      gap-6
      mt-20
      ">



        <div className="
        bg-white
        rounded-3xl
        p-8
        text-center
        shadow-sm
        ">

          <h3 className="
          text-4xl
          font-bold
          text-blue-600
          ">

            500+

          </h3>


          <p className="text-gray-500 mt-2">

            Doctors

          </p>


        </div>







        <div className="
        bg-white
        rounded-3xl
        p-8
        text-center
        shadow-sm
        ">


          <h3 className="
          text-4xl
          font-bold
          text-blue-600
          ">

            20k+

          </h3>


          <p className="text-gray-500 mt-2">

            Patients

          </p>


        </div>







        <div className="
        bg-white
        rounded-3xl
        p-8
        text-center
        shadow-sm
        ">


          <h3 className="
          text-4xl
          font-bold
          text-blue-600
          ">

            24/7

          </h3>


          <p className="text-gray-500 mt-2">

            Support

          </p>


        </div>







        <div className="
        bg-white
        rounded-3xl
        p-8
        text-center
        shadow-sm
        ">


          <h3 className="
          text-4xl
          font-bold
          text-blue-600
          ">

            99%

          </h3>


          <p className="text-gray-500 mt-2">

            Satisfaction

          </p>


        </div>


      </section>









      {/* WHY CHOOSE US */}


      <section className="mt-24">


        <h2 className="
        text-4xl
        font-bold
        text-center
        mb-12
        ">


          Why choose CareBridge?


        </h2>





        <div className="
        grid
        md:grid-cols-3
        gap-8
        ">




          <div className="
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          hover:-translate-y-2
          transition
          ">


            <h3 className="
            text-xl
            font-bold
            mb-3
            text-blue-600
            ">

              Efficiency

            </h3>


            <p className="text-gray-600">

              Book appointments quickly and manage
              your healthcare without unnecessary delays.

            </p>


          </div>








          <div className="
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          hover:-translate-y-2
          transition
          ">


            <h3 className="
            text-xl
            font-bold
            mb-3
            text-blue-600
            ">

              Convenience

            </h3>


            <p className="text-gray-600">

              Access trusted healthcare professionals
              from anywhere at any time.

            </p>


          </div>








          <div className="
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          hover:-translate-y-2
          transition
          ">


            <h3 className="
            text-xl
            font-bold
            mb-3
            text-blue-600
            ">

              Personal Care

            </h3>


            <p className="text-gray-600">

              Receive a healthcare experience built
              around your personal needs.

            </p>


          </div>




        </div>


      </section>



    </div>

  )
}


export default About