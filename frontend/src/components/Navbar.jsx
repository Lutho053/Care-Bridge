import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowProfileMenu(false);
    navigate("/"); // Redirect to home after logout (optional)
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-44 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />

        {/* Hamburger Menu Icon - mobile only */}
        <div className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <img src={assets.menu_icon} alt="Menu" className="w-6 cursor-pointer" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-5 font-medium">
          <li>
            <NavLink to="/" className="flex flex-col items-center group">
              HOME
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctors" className="flex flex-col items-center group">
              ALL DOCTORS
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="flex flex-col items-center group">
              ABOUT
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="flex flex-col items-center group">
              CONTACT
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
            </NavLink>
          </li>
        </ul>

        <Link
  to="/find-doctor"
  className="
    hidden
    md:inline-flex
    group
    relative
    px-4
    py-2.5
    rounded-full
    border-2
    border-primary
    text-primary
    font-medium
    overflow-hidden
    transition-all
    duration-300
  "
>

  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
    Find the Right Doctor
  </span>

  <span
    className="
      absolute
      inset-0
      bg-primary
      scale-x-0
      origin-left
      group-hover:scale-x-100
      transition-transform
      duration-300
    "
  />
</Link>

        {/* Profile or Login Button */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer relative">
              <img
  className="w-8 rounded-full"
  src={userData?.image || assets.default_profile}
  alt="Profile"
  onClick={() => setShowProfileMenu(!showProfileMenu)}
/>

              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute top-12 right-0 text-base font-medium text-gray-600 z-20 min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-md">
                  <p
                    onClick={() => {
                      navigate("/my-profile");
                      setShowProfileMenu(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowProfileMenu(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      logout();
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-8 py-3 rounded-full font-light"
            >
              Create Account
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
{showMobileMenu && (
<ul className="
md:hidden 
flex 
flex-col 
gap-4 
bg-white 
p-4 
rounded 
shadow-md 
font-medium
">

<li>
<NavLink
to="/"
onClick={()=>setShowMobileMenu(false)}
className="block"
>
HOME
</NavLink>
</li>


<li>
<NavLink
to="/doctors"
onClick={()=>setShowMobileMenu(false)}
className="block"
>
ALL DOCTORS
</NavLink>
</li>


<li>
<NavLink
to="/about"
onClick={()=>setShowMobileMenu(false)}
className="block"
>
ABOUT
</NavLink>
</li>


<li>
<NavLink
to="/contact"
onClick={()=>setShowMobileMenu(false)}
className="block"
>
CONTACT
</NavLink>
</li>


{
token ? (

<>

<li
onClick={()=>{
navigate("/my-profile");
setShowMobileMenu(false);
}}
className="cursor-pointer"
>
MY PROFILE
</li>


<li
onClick={()=>{
navigate("/my-appointments");
setShowMobileMenu(false);
}}
className="cursor-pointer"
>
MY APPOINTMENTS
</li>


<li
onClick={logout}
className="cursor-pointer text-red-500"
>
LOGOUT
</li>

</>


) : (

<li>

<button
onClick={()=>{

navigate("/login");
setShowMobileMenu(false);

}}
className="
bg-primary 
text-white 
px-6 
py-2 
rounded-full 
w-full
"
>
CREATE ACCOUNT
</button>

</li>

)

}


</ul>
)}
    </div>
  );
};

export default Navbar;
