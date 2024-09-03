import React, { useState } from 'react';
const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <>
      <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold bg-blue-300">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </nav>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    </>
  );
};

const Popup = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <p>This is where you'd put your login form.</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  </div>
);

export default Navbar;
