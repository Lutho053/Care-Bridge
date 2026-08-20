
import SpecialityMenu from "../components/SpecialityMenu"
import TopDoctors from "../components/TopDoctors"
import Banner from "../components/Banner"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      


      {/* Hero Section */}
      <section className="px-6 md:px-16 lg:px-24 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Book your doctor appointment
              <span className="text-blue-600">
                {" "}anytime, anywhere.
              </span>
            </h1>


            <p className="mt-6 text-gray-600 text-lg">
              Find trusted doctors, schedule appointments,
              and manage your healthcare journey easily.
            </p>


            <div className="mt-8 flex gap-4 sm:flex-row flex-col items-center">

              <Link
                    to="/find-doctor"
                    className="
                      bg-blue-600
                      text-white
                      px-6
                      sm:px-8
                      py-3
                      rounded-full
                      hover:bg-blue-700
                      transition
                      text-center
                      w-full
                      sm:w-auto
                    "
                  >
                    Tell us what you need
                  </Link>
                    
                  <Link
                    to="/about"
                    className="
                      border
                      border-blue-600
                      text-blue-600
                      px-6
                      sm:px-8
                      py-3
                      rounded-full
                      text-center
                      w-full
                      sm:w-auto
                    "
                  >
                    Learn More
                  </Link>

            </div>


            <div className="mt-10 flex gap-8">

              <div>
                <h3 className="font-bold text-2xl">
                  500+
                </h3>
                <p className="text-gray-500">
                  Doctors
                </p>
              </div>


              <div>
                <h3 className="font-bold text-2xl">
                  10k+
                </h3>
                <p className="text-gray-500">
                  Patients
                </p>
              </div>


              <div>
                <h3 className="font-bold text-2xl">
                  24/7
                </h3>
                <p className="text-gray-500">
                  Support
                </p>
              </div>


            </div>


          </div>



          <div>

            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
              className="
              rounded-3xl
              shadow-xl
              w-full
              h-[500px]
              object-cover
              "
            />

          </div>


        </div>
      </section>



      {/* Specialities */}

      <section className="px-6 md:px-16 lg:px-24 py-10">

        <SpecialityMenu/>

      </section>

      {/* Doctors */}

      <section className="px-6 md:px-16 lg:px-24 py-10">
        <TopDoctors/>
      </section>

      {/* CTA */}

      <section className="px-6 md:px-16 lg:px-24 py-16">

        <Banner/>

      </section>

    </div>
  )
}

export default Home