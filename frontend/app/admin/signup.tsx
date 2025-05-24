"use client";
import React from 'react';

const SignUp = ({ toggleForm }: { toggleForm: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-neutral shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold text-neutral-content">Admin Sign Up</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered bg-neutral-focus text-neutral-content placeholder-neutral-content"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-neutral-focus text-neutral-content placeholder-neutral-content"
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
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-neutral-content">
              Already have an account?{' '}
              <button onClick={toggleForm} className="text-accent underline">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
