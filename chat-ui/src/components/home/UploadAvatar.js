/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

export function UploadAvatar() {

  // states
  const [avatar, setAvatar] = useState('');
  const [avatarResult, setAvatarResult] = useState(null);

  // contexts
  const { dispatch } = useContext(AuthContext);
  // functions
  const handleChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatar !== '') {
      const result = window.confirm("Confirm... this action !");
      if (result) {
        uploadImage();
      }
    }
  }
  const uploadImage = async () => {
    let token = localStorage.getItem('token');
    let formData = new FormData();
    formData.append('avatar', avatar);
    try {
      const result = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_FILES_STORE}upload/profileAvatar/`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setAvatarResult(result);
    } catch (err) {
      console.log(err);
    }
  };

  // effects
  useEffect(() => {
    if (avatarResult && avatarResult.data){
      dispatch({ type: 'SET_CURRENT_USER', currentUser: avatarResult.data.user });
      setAvatar('');
    }
  }, [avatarResult]);
  return (
    <div className="pt-6">
      <form onSubmit={handleSubmit}>
        <input 
          type="file"
          onChange={handleChange}
          className="bg-teal-500 w-full text-sm text-white 
            py-1 focus:outline-none hover:bg-teal-400 border border-transparent 
            leading-5 font-medium rounded-md active:bg-teal-400 
            active:outline-none transition duration-150 ease-in-out" 
          name="avatar"
          accept=".jpeg,.png,.jpg"
        />
        <button 
          type="submit" 
          className="group mt-4 py-1 px-4 mr-4 border border-transparent 
            text-sm leading-5 font-medium rounded-md text-white 
            bg-teal-500 hover:bg-teal-400 focus:outline-none 
            focus:border-teal-400 focus:shadow-outline-teal 
            active:bg-teal-400 active:outline-none transition duration-150 ease-in-out" 
        >
          Upload
        </button>
      </form>
    </div>
  )
}