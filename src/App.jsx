import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import Protected from "./private/Protected";
import GuestRoute from "./private/GuestRoute";

import UserTransaction from "./components/user/UserTransaction"
import AddTransaction from "./components/user/AddTransaction"
import UserProfile from "./components/user/UserProfile"
import AllTransaction from "./components/admin/AllTransaction";
import AllUser from "./components/admin/AllUsers";
import AdminProfile from "./components/admin/AdminProfile";

function App () {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<GuestRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/reg" element={<Register />} />
        </Route>

        <Route element={<Protected />}>
          <Route path="/admindash" element={<AdminDashboard />} />
          <Route path="/userdash" element={<UserDashboard />} />
          <Route path="/usertransaction" element={<UserTransaction/>} />
          <Route path="/addtransaction" element={<AddTransaction />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/alltransaction" element={<AllTransaction />} />
          <Route path="/alluser" element={<AllUser />} />
          <Route path="/adminprofile" element={<AdminProfile />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;