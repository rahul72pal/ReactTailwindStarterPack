import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../../data/navbar-links'
import { useSelector } from 'react-redux'
import Profiledropdown from '../Auth/Profiledropdown'
import { apiConnector } from '../../../services/apiconnector'
import { categories } from '../../../services/apis'
import { BsArrowDownCircle } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
// import { logout } from '../../../services/opreations/authAPI'
// import { useNavigate } from 'react-router-dom'
// import {useDispatch} from 'react-redux'

const Navbar = () => {

    let { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.card);
    const location = useLocation();
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // console.log("User = ", user);
    // console.log("Token = ", token);

    // if(!user){
    //     token=null;
    //     console.log("User Not Present");
    // }



    const [sublinks, setsublinks] = useState([]);
    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log(result);
            setsublinks(result.data.data);
        } catch (error) {
            console.log("Clould not fetch the category link")
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-1  border-b-blue-700'>
            <div className='text-white flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* this is Nav bar */}
                <Link to={"/"}>
                    <img src={logo} alt="" width={106} height={42} loading='lazy' />
                </Link>

                {/* nav links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25 '>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className='group relative'>
                                                <p className='flex items-center gap-2 cursor-pointer '>{link.title}  <BsArrowDownCircle className='mt-1' /> </p>
                                                <div className="invisible absolute left-[-30%] top-[140%] flex flex-col
                                                 bg-richblack-25 p-4 text-richblack-900 opacity-0 transition-all duration-200
                                                  group-hover:visible group-hover:opacity-100 w-[200px] rounded-sm z-20 cursor-pointer">
                                                    {sublinks.length > 0 ? (
                                                        <>
                                                            {sublinks.map((data, index) => (
                                                                <p className="text-richblack-400 hover:text-richblack-800 font-semibold" key={index}>
                                                                    <Link to={`/catalog/${data.name}`}>
                                                                        {data.name}
                                                                    </Link>
                                                                </p>
                                                            ))}
                                                            <div className="invisible absolute left-[39%] top-[-6%] flex flex-col
                                                             bg-richblack-25 p-4 text-richblack-200 opacity-0 transition-all duration-200
                                                              group-hover:visible group-hover:opacity-100 w-5 rotate-45 rounded-sm z-20">
                                                                {/* Content for the inner div */}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div>No Catalog Found</div>
                                                    )}
                                                </div>


                                            </div>
                                        ) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* login/singup/dashboard/addtocard  */}
                <div className='flex justify-center items-center gap-x-6'>
                    {
                        user && user?.accountType !== 'instructor' && (
                            <Link to="/dashboard/cart" className='relative text-[25px] text-blue-50'>
                                <AiOutlineShoppingCart className='' />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute text-[14px] -top-2 -right-3 bg-yellow-25 px-[7px] rounded-full text-black  '>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='px-2 py-1 bg-richblack-800  text-richblack-100 border-1 border-richblack-200 m-2 rounded-sm'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="signup">
                                <button className='px-2 py-1 bg-richblack-800  text-richblack-100 border-1 border-richblack-200 m-2 rounded-sm'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null
                        && (
                            <Profiledropdown />
                        )
                    }
                    {/* {
                        user === null && (

                            <button className='px-2 py-1 bg-richblack-800  text-richblack-100 border-1 border-richblack-200 m-2 rounded-sm'
                                onClick={()=>{dispatch(logout(navigate))}}
                            >
                                Logout
                            </button>

                        )
                    } */}
                </div>

            </div>
        </div>
    )
}

export default Navbar
