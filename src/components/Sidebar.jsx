import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import logo from '../assets/logo.png'
import categories from '../utils/categories'
const isNotActiveStyle='flex items-center px-5 gap-5 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle='flex items-center px-5 gap-5 font-extrabold  border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

const Sidebar = ({user,closeToggle}) => {
  const handleCloseSidebar= ()=>{
    if (closeToggle) {
      closeToggle(false)
    }
  }
  return (
    <div className='flex  flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link 
          to={'/'} 
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className='w-full' />

        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink 
            to={'/'} 
            onClick={handleCloseSidebar}
            className={({isActive})=>isActive?isActiveStyle:isNotActiveStyle}
          >
            
            <RiHomeFill/>
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Categories</h3>
          {categories.map(category=>(
            <NavLink
              key={category.name}
              to={`/category/${category.name}`}
              onClick={handleCloseSidebar}
              className={({isActive})=>isActive?isActiveStyle:isNotActiveStyle}
            >
              <img src={category.image} className='w-8 h-8 rounded-full shadow-sm' alt='category' />
              {category.name}
            </NavLink>
        ))}
        </div>
      </div>
      {user && (
        <Link to={`user-profile/${user._id}`}>
          <div 
            onClick={handleCloseSidebar}
            className='flex items-center mb-3 my-5 px-5 gap-2 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
          >
            <img src={user.image} alt="user-profile" className='w-10 h-10 rounded-full' />
            <p className=''>{user.username}</p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default Sidebar