import React from 'react';
import { logoutUser } from '../firebaseService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      toast.success('Logout Successfully')
      window.location.href = '/';
      } else {
      toast.error('Logout failed.')
    }
  };

  return (
    <section style={{margin: 'auto', paddingRight: '50px'}}>
      <button style={{borderRadius: '8px', padding:'5px', fontSize:'14px'}} onClick={handleLogout}>Logout</button>
    </section>
  );};

export default Logout;

