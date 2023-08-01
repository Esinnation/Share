import React,{useState,useEffect} from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import {useParams,useNavigate} from  'react-router'
import { googleLogout } from "@react-oauth/google"
import MasonryLayout from "./MasonryLayout";
import Spinner from './Spinner'
import {
	userCreatedPinsQuery,
	userQuery,
	userSavedPinsQuery,
} from "../utils/data";
import { client } from '../client'


const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate()
  const {userId} = useParams()

  const randomImage='https://source.unsplash.com/1600x900/?nature,photography,technology'
  const activeBtnStyles= 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
  const notActiveBtnStyles= 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'
  const logout=()=>{
    googleLogout()
    localStorage.clear()
    navigate('/login')
  }
  useEffect(()=>{
    const query = userQuery(userId)
    client.fetch(query)
    .then((data)=>{
      setUser(data[0])
    })
  },[userId])

  useEffect(()=>{
    const getUserPins = async () => {
			const pinType = activeBtn;
			setPins(null);
			const query =
				pinType === "created"
					? userCreatedPinsQuery(userId)
					: userSavedPinsQuery(userId);

			try {
				const data = await client.fetch(query);
				setPins(data);
			} catch (error) {
				console.log(`Could not get User's ${pinType} Pins`);
				setPins([]);
			}
		};
		getUserPins();

  },[activeBtn,userId])

  if(!user){
    return <Spinner message='Loading Profile...'/>
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className="flex flex-col pb-5">
				<div className="relative flex flex-col mb-7">
					<div className="flex flex-col justify-center items-center">
          <img
							className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
							src={randomImage}
							alt="banne-pic"
						/>
						<img
							className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
							src={user.image}
							alt="user-pic"
						/>
            <h1 className="font-bold text-3xl text-center mt-3 capitalize">
              {user.username}
            </h1> 
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user?._id && (
                <button
                  type="button"
                  className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={logout}>
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mb-7">
					<button
						type="button"
						className={`${activeBtn === "created" ? activeBtnStyles:notActiveBtnStyles}`}
						onClick={e => {
							setActiveBtn("created");
						}}
						>
						Created
					</button>
					<button
						type="button"
            className={`${activeBtn=== "saved" ? activeBtnStyles:notActiveBtnStyles} `}
						onClick={e => {
							setActiveBtn("saved");
						}}
						>
						Saved
					</button>
				</div>
  
				{!pins ? (
					<p>Loading pins...</p>
				) : !pins?.length ? (
					<div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
						No Pins Found!
					</div>
				) : (
					<div className="px-2">
						<MasonryLayout pins={pins} />
					</div>
				)}
			</div>
      </div>

  )
}

export default UserProfile