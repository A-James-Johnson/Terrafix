import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ onClose }) => {
  const [user, setUser] = useState({});
  const navigate =useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleClick =()=>{
   localStorage.removeItem("user");
   navigate("/"); 
   

   
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-80 animate-scale-up">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">User Profile</h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">Username:</span> {user.username}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
        </div>
        <button
       onClick={handleClick}
          className="mt-6 w-full bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-900 hover:to-indigo-700 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
