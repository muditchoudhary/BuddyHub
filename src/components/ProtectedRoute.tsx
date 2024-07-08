import { Navigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

import { useAppSelector } from '@/app/hooks';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.user);
  if (user === null) {
    return (
      <div className="loading-container w-full h-screen flex justify-center items-center fixed z-[1] bg-white bg-opacity-90">
        <HashLoader color="#1D3557" />
      </div>
    );
  }

  if (user === false) {
    return <Navigate to="/" replace />;
  } else {
    return <>{children}</>;
  }
}

export default ProtectedRoute;
