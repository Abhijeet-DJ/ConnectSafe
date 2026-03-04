import { Eye, EyeOff, Loader, Loader2, Lock, Mail } from 'lucide-react';
import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern.jsx';

function LoginPage() {
  const [showPass , setShowPass] = useState(false);
    const [formData , setFormData] = useState({
      email : "",
      pass : ""
    });
    const { login , isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
      e.preventDefault();
      login(formData)
    }

  return (
    <div className='h-screen grid lg:grid-cols-2 ' >
      {/* Left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 '>
        <div className='w-full max-w-md space-y-8 ' >
          {/* Logo */}
          <div className='text-center mb-8' >

          </div>

          {/* Form */}
          <form onSubmit={ handleSubmit } className='space-y-6' >
            <div className='form-control' >
              <label className='label ' >
                <span className='label-text mb-8 ' >
                  Email
                </span>
              </label>
              <div className='relative' >
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ' >
                  <Mail className='size-5 text-base-content/40 '/>
                </div>
                <input 
                type="email"
                className='input input-bordered w-full pl-10 '
                placeholder='yourmail@gmail.com'
                value={ formData.email }
                onChange={(e) => setFormData({...formData, email : e.target.value})} 
                />
              </div>
            </div>
            
            <div className='form-control' >
              <label className='label'>
                <span className='label-text font-medium ' >
                  Password
                </span>
              </label>
              <div className='relative' >
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ' >
                  <Lock className='size-5 text-base-content/40 ' />
                </div>
                <input 
                type={ showPass ? "text" : "password" } 
                className='input input-bordered w-full pl-10 '
                placeholder='********'
                value={formData.pass}
                onChange={(e) => setFormData({ ...formData , pass : e.target.value })}
                />
                <button
                type='button' 
                className='absolute inset-y-0 right-0 pr-3 flex items-center ' 
                onClick={ (e) => setShowPass(!showPass) }
                >
                  { showPass ? ( <EyeOff className='size-5 text-base-content/40' /> ) : <Eye className='size-5 text-base-content/40 ' /> }
                </button>
              </div>
            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn} >
              { isLoggingIn ? 
              <>
              <Loader2 className='size-5 animate-spin ' />
              Loading... 
              </> : 
              <>
                Sign In
              </> }
            </button>
          </form>

          <div className='text-center' >
            <p>
              Don&apos;t have an account?{""}
              <Link to={"/signup"} className='link link-primary' >
                Create account.
              </Link>
            </p>
          </div>

        </div>
      </div>
      {/* Right side */}
      <AuthImagePattern 
      title="Join our community"
      subtitle="Connect with your loved ones."
      />
    </div>
  )
}

export default LoginPage
