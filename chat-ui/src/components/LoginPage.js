/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Navbar } from './core/Navbar';
import { LOGIN } from '../apollo-client/authGql';
import { Loader } from './core/Loader';
import { AuthContext } from '../contexts/AuthContext';

export function LoginPage() {

  // hook form
  const { register, handleSubmit, errors } = useForm();

  // contexts
  const { dispatch } = useContext(AuthContext);


  // apollo
  const [login, { data, loading }] = useMutation(LOGIN);
  const history = useHistory();
  // functions
  const onSubmit = async (data) => {
    if (data) {
      try {
        await login({
          variables: {
            email: data.email,
            password: data.password
          }
        })
      } catch (err) {
        console.log(err);
      }
    }
  };

  // effects
  useEffect(() => {
    if (data && data.login) {
      dispatch({ type: 'SET_AUTH_DATA', authData: data.login });
      localStorage.setItem('token', data.login.token);
      history.push("/home");
    }
  }, [data]);
  return (
    <div className="login-page">
      <Navbar />
      <br />
      <br />
      <div className="p-10">
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-800">
          Sign In to your account
        </h2>
        <p className="text-sm mt-2 leading-5 text-center text-gray-600">
          Or
          <span className="text-teal-400">
            <Link to="/register"> Create an account. </Link>
          </span> 
          Its simple and easy<br/>
        </p>
        <br />
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <div className="lg:w-1/3 md:w-2/3 w-full">
              <label 
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                htmlFor="email">
                  Email
              </label>
              <input 
                aria-label="Email address" 
                name="email" 
                id="email"
                type="email" 
                ref={register({
                  required: "Email Address is required"
                })}
                placeholder="test.js@gmail.com" 
                className="bg-gray-200 appearance-none border-2 border-gray-200 
                  rounded w-full py-2 px-4 text-gray-700 leading-tight 
                  focus:outline-none focus:bg-white focus:border-teal-500"
                required 
              />
              <span 
                className="block text-red-400 text-xs italic"
              >
                {errors.email && <>{errors.email.message}</>}
              </span>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="lg:w-1/3 md:w-2/3 w-full">
              <label 
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                htmlFor="password">
                  Password
              </label>
              <input 
                aria-label="Password" 
                name="password" 
                id="password"
                type="password" 
                ref={register({
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: 'Password must be great than 8 characters'
                  }
                })}
                placeholder="******" 
                className="bg-gray-200 appearance-none border-2 border-gray-200 
                  rounded w-full py-2 px-4 text-gray-700 leading-tight 
                  focus:outline-none focus:bg-white focus:border-teal-500"
                required 
              />
              <span 
                className="block text-red-400 text-xs italic"
              >
                {errors.password && <>{errors.password.message}</>}
              </span>
            </div>
          </div>
          <>
            {loading ? (
              <div className="mt-6 flex justify-center">
                <Loader />
              </div>
            ) : null}
          </>
          <div className="mt-4 flex justify-center">
            <button 
              type="submit" 
              className="group w-full lg:w-1/3 md:w-2/3 
                py-2 px-4 mr-4 border border-transparent 
                text-sm leading-5 font-medium rounded-md text-white 
                bg-teal-500 hover:bg-teal-400 focus:outline-none 
                focus:border-teal-400 focus:shadow-outline-teal 
                active:bg-teal-400 active:outline-none transition duration-150 ease-in-out" 
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}