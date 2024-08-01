import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Head = () => {
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
      
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="absolute w-screen bg-gradient-to-b from-black z-10 flex justify-between items-center">
        <img className='m-8 w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt='Logo-image' />
        { user &&       
        <div className='p-2 flex'>
          <img className="w-12 h-12" src={user?.photoURL} alt='user Icon' />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
        }
    </div>
  )
}

export default Head