/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Navbar } from './core/Navbar';
import { useForm } from 'react-hook-form';
import { REGISTER } from '../apollo-client/authGql';
import { Loader } from './core/Loader';

export function RegisterPage() {
  // hook form
  const { register, handleSubmit, errors, watch } = useForm();
  const history = useHistory();
  // apollo
  const [signUp, { data, loading }] = useMutation(REGISTER);

  // functions
  const onSubmit = async (data) => {
    if (data) {
      try {
        await signUp({
          variables: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  };

  // effects
  useEffect(() => {
    if (data && data.register) {
      history.push('/login');
    }
  }, [data]);
  return (
    <div className="register-page">
      <Navbar />
      <br />
      <div className="p-10">
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-800">
          Register your account
        </h2>
        <p className="text-sm mt-2 leading-5 text-center text-gray-600">
          Or
          <span className="text-teal-400">
            <Link to="/login"> Sign In. </Link>
          </span> 
          Its quick access<br/>
        </p>
        <br />
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex justify-end">
              <div className="lg:w-1/3 md:w-2/3 w-full">
                <label 
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                  htmlFor="firstName">
                    First Name
                </label>
                <input 
                  aria-label="First Name" 
                  name="firstName" 
                  id="firstName"
                  type="text" 
                  ref={register({
                    required: "First Name is required",
                    minLength: {
                      value: 3,
                      message: 'First Name must be great than 3 characters'
                    }
                  })}
                  placeholder="John" 
                  className="bg-gray-200 appearance-none border-2 border-gray-200 
                    rounded w-full py-2 px-4 text-gray-700 leading-tight 
                    focus:outline-none focus:bg-white focus:border-teal-500"
                  required 
                />
                <span 
                  className="block text-red-400 text-xs italic"
                >
                  {errors.firstName && <>{errors.firstName.message}</>}
                </span>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="lg:w-1/3 md:w-2/3 w-full">
                <label 
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                  htmlFor="lastName">
                    Last Name
                </label>
                <input 
                  aria-label="Email address" 
                  name="lastName" 
                  id="lastName"
                  type="text" 
                  ref={register({
                    required: "Last Name is required",
                    minLength: {
                      value: 3,
                      message: 'First Name must be great than 3 characters'
                    }
                  })}
                  placeholder="Doe" 
                  className="bg-gray-200 appearance-none border-2 border-gray-200 
                    rounded w-full py-2 px-4 text-gray-700 leading-tight 
                    focus:outline-none focus:bg-white focus:border-teal-500"
                  required 
                />
                <span 
                  className="block text-red-400 text-xs italic"
                >
                  {errors.lastName && <>{errors.lastName.message}</>}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
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
          <div className="grid grid-cols-2 gap-1 mt-4">
            <div className="flex justify-end">
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
                  ref={register({
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: 'First Name must be great than 8 characters'
                    }
                  })}
                  type="password" 
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
            <div className="flex justify-start">
              <div className="lg:w-1/3 md:w-2/3 w-full">
                <label 
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                  htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input 
                  aria-label="Confirm Password" 
                  name="confirmPassword" 
                  id="confirmPassword"
                  type="password" 
                  ref={register({
                    required: "Confirm Password is required",
                    minLength: {
                      value: 8,
                      message: 'First Name must be great than 8 characters'
                    },
                    validate: (value) => value === watch('password') || 
                    "Confirm Password must be the same as Password"
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
                  {errors.confirmPassword && <>{errors.confirmPassword.message}</>}
                </span>
              </div>
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}