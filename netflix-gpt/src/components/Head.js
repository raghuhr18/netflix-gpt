import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Head = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
      
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
          navigate("/browse");
          // ...
        } else {
          // User is signed out
          // ...
          dispatch(removeUser())
          navigate("/")
        }
      });
      return () => unsubscribe();
},[])
  return (
    <div className="absolute w-screen bg-gradient-to-b from-black z-10 flex justify-between items-center">
        <img className='m-8 w-44' src={LOGO}
        alt='Logo-image' />
        { user &&       
        <div className='p-2 flex'>
          <img className="w-12 h-auto" src={user?.photoURL} alt='user Icon' />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
        }
    </div>
  )
}

export default Head