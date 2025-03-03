import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './assets/components/Dashboard';
import Login from './assets/components/login';
import Signup from './assets/components/signup';
import Home from './assets/components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;



// function App(){
// const appRouter = createBrowserRouter([
//         {
//           path:"/home",
//           element:<Home/>
//         },
//         { 
//          path:"/login",
//          element:<Login />
//         } ,
//         {  
//         path:"/signup",
//         element:<Signup />
//         } 
// ])

// const root=ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={appRouter}></RouterProvider>)
// }

