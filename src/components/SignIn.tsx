"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const router = useRouter();

  // Get admin credentials from environment variables
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  // Auto-fill admin credentials in development for convenience
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && ADMIN_EMAIL && ADMIN_PASSWORD) {
      setEmail(ADMIN_EMAIL);
      setPassword(ADMIN_PASSWORD);
    }
  }, [ADMIN_EMAIL, ADMIN_PASSWORD]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Check for admin credentials
      if (ADMIN_EMAIL && ADMIN_PASSWORD && 
          email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setIsAdminLogin(true);
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
          role: 'admin',
          callbackUrl: '/admin/dashboard'
        });

        if (result?.error) {
          throw new Error(result.error);
        }
        router.push('/admin/dashboard');
        return;
      }

      // Regular user login
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/home'
      });

      if (result?.error) {
        throw new Error(result.error);
      }
      router.push('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/home' });
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error(err);
    }
  };

  const handleTwitterSignIn = async () => {
    try {
      await signIn('twitter', { callbackUrl: '/home' });
    } catch (err) {
      setError('Failed to sign in with Twitter');
      console.error(err);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signIn('facebook', { callbackUrl: '/home' });
    } catch (err) {
      setError('Failed to sign in with Facebook');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
          {isAdminLogin ? 'ADMIN SIGN IN' : 'SIGN IN'}
        </h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        {process.env.NODE_ENV === 'development' && ADMIN_EMAIL && (
          <div className="mb-4 p-2 bg-yellow-100 text-yellow-700 text-sm rounded">
            Development: Admin email pre-filled
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center mb-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              {isAdminLogin ? 'Sign In as Admin' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="w-full mt-6">
          <p className="text-center text-gray-600 mb-4">Or continue with</p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={handleGoogleSignIn}
              className="cursor-pointer text-3xl hover:opacity-80 transition-opacity"
              aria-label="Sign in with Google"
            >
              <FcGoogle />
            </button>
            <button
              onClick={handleTwitterSignIn}
              className="cursor-pointer text-3xl text-blue-500 hover:opacity-80 transition-opacity"
              aria-label="Sign in with Twitter"
            >
              <FaTwitter />
            </button>
            <button
              onClick={handleFacebookSignIn}
              className="cursor-pointer text-3xl text-blue-600 hover:opacity-80 transition-opacity"
              aria-label="Sign in with Facebook"
            >
              <FaFacebook />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-green-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}