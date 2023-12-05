// Login.js
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 login-page-main">
      <div className="image-box">
        <Image
          className="image1-signin-page"
          src="/kaaryam2.png" // Replace with the actual path to your image
          alt="Logo"
          width={150}
          height={150}
        />
        <Image
          className="image2-signin-page"
          src="/kaaryam1.png" // Replace with the actual path to your image
          alt="Logo"
          width={150}
          height={150}
        />
        <Image
          className="image3-signin-page"
          src="/kaaryam2.png" // Replace with the actual path to your image
          alt="Logo"
          width={250}
          height={250}
        />
        <Image
          className="image4-signin-page"
          src="/kaaryam1.png" // Replace with the actual path to your image
          alt="Logo"
          width={250}
          height={250}
        />
      </div>
      <div className=" p-8 rounded-lg shadow-md w-96 login-page-box">
        <div>
          <h1 className="text-3xl font-bold mb-4 ">Kaaryam</h1>
          <p className="text-sm   mb-6">
            An application to manage your to-do list.
          </p>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => signIn("google")}
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
