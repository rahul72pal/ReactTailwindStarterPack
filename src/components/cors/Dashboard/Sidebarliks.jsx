import React from 'react'
import { NavLink, matchPath } from 'react-router-dom'
import * as Icons from 'react-icons/vsc'
import { useLocation } from 'react-router-dom'


const Sidebarliks = ({ name, icon, path }) => {
    // console.log(name,icon,path);
    const Logo = Icons[icon];
    const location = useLocation();
    

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div>
            <NavLink to={path}
                className={`${matchRoute(path) ? "text-yellow-5 bg-black" : "text-white"}`}
            >
                <div className='flex items-center gap-3 text-lg font-semibold '>
                    <Logo className='font-bold' />
                    {name}
                </div>


            </NavLink>

           

        </div>
    )
}

export default Sidebarliks
