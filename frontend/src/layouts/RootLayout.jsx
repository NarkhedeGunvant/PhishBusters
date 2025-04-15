import { Outlet } from 'react-router-dom';
import Navbar from '../components/nav/Navbar';
import Footer from '../components/nav/Footer';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <LoginModal />
      <SignupModal />
    </>
  );
};

export default RootLayout;