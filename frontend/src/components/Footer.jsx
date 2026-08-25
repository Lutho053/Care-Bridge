import { assets } from "../assets/assets"
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-32">

  <div className="md:mx-10 px-6 md:px-0">

    {/* MAIN FOOTER */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 py-16">

      {/* BRAND */}

      <div>

        <img
          className="mb-6 w-40"
          src={assets.logo}
          alt="CareBridge"
        />

        <p className="max-w-md text-gray-600 leading-7">

          CareBridge connects patients with trusted healthcare
          professionals, making it easier to find the right doctor,
          book appointments, and manage your healthcare journey.

        </p>

        <p className="mt-5 text-sm text-gray-500">

          Your health. Your care. Connected.

        </p>

      </div>


      {/* COMPANY */}

      <div>

        <h3 className="text-lg font-semibold mb-6">

          Company

        </h3>

        <ul className="flex flex-col gap-4 text-gray-600">

          <li>
            <Link
              to="/"
              className="hover:text-primary transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:text-primary transition"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              to="/doctors"
              className="hover:text-primary transition"
            >
              Find a Doctor
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="hover:text-primary transition"
            >
              Contact Us
            </Link>
          </li>

        </ul>

      </div>


      {/* PATIENTS */}

      <div>

        <h3 className="text-lg font-semibold mb-6">

          Patients

        </h3>

        <ul className="flex flex-col gap-4 text-gray-600">

          <li>
            <Link
              to="/doctors"
              className="hover:text-primary transition"
            >
              Browse Doctors
            </Link>
          </li>

          <li>
            <Link
              to="/my-appointments"
              className="hover:text-primary transition"
            >
              My Appointments
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="hover:text-primary transition"
            >
              Patient Login
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="hover:text-primary transition"
            >
              Create Account
            </Link>
          </li>

        </ul>

      </div>


      {/* CONTACT */}

      <div>

        <h3 className="text-lg font-semibold mb-6">

          Get In Touch

        </h3>

        <ul className="flex flex-col gap-4 text-gray-600">

          <li>

            <span className="font-medium text-gray-800">
              Phone
            </span>

            <br />

            +27 69 579 0416

          </li>


          <li>

            <span className="font-medium text-gray-800">
              Email
            </span>

            <br />

            support@carebridge.co.za

          </li>

        </ul>

      </div>

    </div>


    {/* BOTTOM FOOTER */}

    <div className="border-t py-6 flex flex-col md:flex-row justify-between items-center gap-4">

      <p className="text-sm text-gray-500 text-center md:text-left">

        © 2026 CareBridge. All rights reserved. A{" "}
     <a href="https://kazeq.co.za" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">Kazeq Technologies</a> product.

      </p>


      <div className="flex gap-6 text-sm text-gray-500">

        <Link
          to="/privacy-policy"
          className="hover:text-primary transition"
        >
          Privacy Policy
        </Link>

        <Link
          to="/terms"
          className="hover:text-primary transition"
        >
          Terms of Service
        </Link>

      </div>

    </div>

  </div>

</footer>
  )
}

export default Footer