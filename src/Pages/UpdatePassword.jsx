import React, { useState } from 'react';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isStrongPassword = (password) => {
    // You can implement your own password strength criteria here
    // For this example, we'll consider a password as strong if it has at least 8 characters
    return password.length >= 8;
  };

  return (
    <div className="flex justify-center items-center -mt-10 h-screen">
      <div className="w-80 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">New Password <sup class="text-pink-200">*</sup></label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              className="w-full border-b-2 border-blue-300 bg-richblack-700 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600">Confirm Password <sup class="text-pink-200">*</sup></label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              className="w-full border-b-2 border-blue-300 p-2 bg-richblack-700 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              checked={isStrongPassword(password)}
              readOnly
              className="mr-2 bg-richblack-700"
            />
            Password Strength: {isStrongPassword(password) ? 'Strong' : 'Weak'}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-25 text-black font-semibold p-2 rounded hover:bg-yellow-50"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
