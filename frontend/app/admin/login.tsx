"use client";
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault(); // Prevent the default form submission behavior


    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
      console.log('Response:', data);
      const accessToken = data.access_token;
      localStorage.setItem('accessToken', accessToken);

      window.location.href = '/admin/user';
      }
      else {
        if(response.status === 401){
          alert("Invalid credentials");
        }
        else{
          alert("An error occurred. Please try again later.");
        }
      }

      

    } catch (error) {
      console.error('Error:', error);

      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-neutral shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold text-neutral-content">Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-neutral-focus text-neutral-content placeholder-neutral-content"

                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered bg-neutral-focus text-neutral-content placeholder-neutral-content"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"

              >
                Login
              </button>
            </div>
          </form>
          {/* <div className="text-center mt-4">
            <p className="text-neutral-content">
              Don&apos;t have an account?{' '}
              <button onClick={toggleForm} className="text-accent underline">
                Sign Up
              </button>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
