import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordType, setpasswordType] = useState('password');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex md:items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">BuddyHub Sign In</h2>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" className="w-full bg-uiBlue hover:bg-uiBlue hover:bg-opacity-90 text-white py-2 rounded-lg">
            Sign In
          </Button>
          <Button type="submit" className="w-full bg-uiBlue hover:bg-uiBlue hover:bg-opacity-90 text-white py-2 rounded-lg mt-3">
            Sign In as a Demo User
          </Button>
          <div className="text-center mt-4">
            <p className="text-gray-700">OR</p>
          </div>
          <div className="text-center mt-4">
            <Link to="/signup" className=" text-uiRed underline">
              Create a new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
