"use client";
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <div style={styles.container}>
      <Image
        className="sm:hidden"
        src="/karyam-main.png" // Replace with the actual path to your image
        alt="Logo"
        width={500}
        height={500}
        style={styles.logo}
      />
      <h1 style={styles.heading}>Welcome to Your App</h1>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
  },
  logo: {
    width: "50px", // Adjust the width of the image as needed
    height: "50px", // Adjust the height of the image as needed
    position: "absolute",
    top: "10px",
    left: "10px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SignInPage;
