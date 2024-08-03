import React, { useRef, useState } from 'react'
import Head from './Head'
import { checkValidData} from '../utils/validate'
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { BG_IMG, USER_AVATAR } from '../utils/constants';

const Login = () => {
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)

    const handleSignup = () => {
        setIsSignInForm(!isSignInForm)
        setErrMessage(" ");
    }
    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrMessage(message)

        if(message) return;

        if(!isSignInForm) {
            // SignUp Here

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: name.current.value, 
                    photoURL: USER_AVATAR
                  }).then(() => {
                    const { uid, email, displayName, photoURL } = auth.currentUser;
                    dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
                    // Profile updated!
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
                // console.log(user);
                // ...

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode + " "+ errorMessage)
                setErrMessage(errorCode + " "+ errorMessage)
                // ..
            });
        }else{
            // SignIn Here

                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrMessage(errorCode +" "+ errorMessage)
                });
        }

    }
  return (
    <div>
        <Head />
        <div className='absolute'>
            <img className="bg-opacity-70" src={BG_IMG}  
            alt="bg-img"/>
        </div>
        <form className='bg-black p-12 absolute w-1/4 mx-auto left-0 right-0 my-36 text-white bg-opacity-80' 
        onSubmit={(e) =>e.preventDefault()}>
            <h1 className='font-bold text-2xl text-white'>{isSignInForm ? "Sign In" : "Sign Up" }</h1>

            {(!isSignInForm)  &&        
            <input type='text' 
            ref={name}
            placeholder='Full Name' required
            className='p-2 my-4 w-full rounded-md bg-slate-700 border border-gray-400'/>}

            <input type='email' 
            ref={email}
            placeholder='Email Address' required
            className='p-2 my-4 w-full rounded-md bg-gray-700 border border-gray-400'/>

            <input type='password' 
            ref={password}
            placeholder='Password' 
            className='p-2 my-4 w-full rounded-md bg-slate-700 border border-gray-400'/>

            <p className='text-red-600 font-bold'>{errMessage}</p>

            <button type='Submit' 
            className='bg-red-600 p-2 my-3 w-full rounded-md' 
            onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

            <p className="cursor-pointer mt-8 hover:underline" onClick={handleSignup}>{isSignInForm ? "New to Netflix? Sign up now." : "Already registered, Sign In"}</p>
        </form>
    </div>
  )
}

export default Login