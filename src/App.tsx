import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

import Homepage from './pages/Homepage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import NoMatch from './pages/NoMatch';
import { useAppDispatch } from './app/hooks';
import { getUser } from './apis/userApis';
import { setUser } from './slices/userSlice';
import ProtectedRoute from './components/ProtectedRoute';
import AuthGuard from './components/auth/AuthGuard';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const asyncFunc = async (token: string) => {
      try {
        setIsLoading(true);
        const data = await getUser(token);
        dispatch(setUser(data.user));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(setUser(false));
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem('user');
    if (token) {
      asyncFunc(token);
    } else {
      dispatch(setUser(false));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<Homepage />} />
        <Route
          path="signup"
          element={
            <AuthGuard>
              <SignupPage />
            </AuthGuard>
          }
        />
        <Route
          path="signin"
          element={
            <AuthGuard>
              <SigninPage />
            </AuthGuard>
          }
        />
        <Route path="protected" element={<ProtectedRoute>{<h2>I am protected</h2>}</ProtectedRoute>} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
      {isLoading && (
        <div className="loading-container w-full h-screen flex justify-center items-center fixed z-[1] bg-white bg-opacity-90">
          <HashLoader color="#1D3557" />
        </div>
      )}
    </>
  );
}

export default App;
