import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appWrite/auth';
import { login, logout } from './store/authSlice';
import { Loader2 } from 'lucide-react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Check if user is logged in
  useEffect(() => {
    authService
      .CheckUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="h-screen w-full grid grid-rows-[auto_1fr_auto] bg-gray-800">
      <Header />
      <main className="w-full flex flex-col overflow-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="text-[#4ADE80]" size={48} />
    </div>
  );
};

export default App;
