import { useState } from 'react';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { signUp } from '@/apis/authApis';
import { useAppDispatch } from '@/app/hooks';
import { setUser } from '@/slices/userSlice';

import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [passwordType, setpasswordType] = useState('password');
  const [confirmPasswordType, setconfirmPasswordType] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      if (formData.password.length < 8) {
        toast.error('Password must be atleadt 8 characters long');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Password & Confirm Password must be same');
        return;
      }
      const data = await signUp({ displayName: formData.displayName, email: formData.email, password: formData.password });
      if (data) {
        dispatch(setUser(data.user));
        localStorage.setItem('user', data.token);
        toast.success(data.message);
        navigate('/');
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex md:items-center justify-center bg-gray-100">
      {isLoading && (
        <div className="loading-container w-full h-screen flex justify-center items-center fixed z-[1] bg-white bg-opacity-90">
          <HashLoader color="#1D3557" />
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">BuddyHub Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-700">
              Display Name
            </label>
            <Input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="mt-1 block w-full"
              placeholder="Your display name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full"
              placeholder="Your email address"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="flex gap-x-2">
              <Input
                type={passwordType}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full"
                placeholder="Your password"
                required
              />
              {passwordHidden && (
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer mt-1"
                  onClick={() => {
                    setPasswordHidden(false);
                    setpasswordType('text');
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              {!passwordHidden && (
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer mt-1"
                  onClick={() => {
                    setPasswordHidden(true);
                    setpasswordType('password');
                  }}
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <div className="flex gap-x-2">
              <Input
                type={confirmPasswordType}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full"
                placeholder="Confirm your password"
                required
              />
              {confirmPasswordHidden && (
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer mt-1"
                  onClick={() => {
                    setConfirmPasswordHidden(false);
                    setconfirmPasswordType('text');
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              {!confirmPasswordHidden && (
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer mt-1"
                  onClick={() => {
                    setConfirmPasswordHidden(true);
                    setconfirmPasswordType('password');
                  }}
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full bg-uiBlue hover:bg-uiBlue hover:bg-opacity-90 text-white py-2 rounded-lg">
            Sign Up
          </Button>
          <div className="text-center mt-4">
            <p className="text-gray-700">OR</p>
          </div>
          <div className="text-center mt-4">
            <Link to="/signin" className=" text-uiRed underline">
              Sign in as existing user
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
