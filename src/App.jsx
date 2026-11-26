
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import Protected from "./private/Protected";
import GuestRoute from "./private/GuestRoute";

import UserTransaction from "./components/user/UserTransaction";
import AddTransaction from "./components/user/AddTransaction";
import UserProfile from "./components/user/UserProfile";

import AllTransaction from "./components/admin/AllTransaction";
import AllUser from "./components/admin/AllUsers";
import AdminProfile from "./components/admin/AdminProfile";

function App () {
  return (
    <BrowserRouter>
      <Routes>

        {/* Guest Routes */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/reg" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admindash"
          element={
            <Protected allowedRole="admin">
              <AdminDashboard />
            </Protected>
          }
        />

        <Route
          path="/alltransaction"
          element={
            <Protected allowedRole="admin">
              <AllTransaction />
            </Protected>
          }
        />

        <Route
          path="/alluser"
          element={
            <Protected allowedRole="admin">
              <AllUser />
            </Protected>
          }
        />

        <Route
          path="/adminprofile"
          element={
            <Protected allowedRole="admin">
              <AdminProfile />
            </Protected>
          }
        />

        {/* User Routes */}
        <Route
          path="/userdash"
          element={
            <Protected allowedRole="user">
              <UserDashboard />
            </Protected>
          }
        />

        <Route
          path="/usertransaction"
          element={
            <Protected allowedRole="user">
              <UserTransaction />
            </Protected>
          }
        />

        <Route
          path="/addtransaction"
          element={
            <Protected allowedRole="user">
              <AddTransaction />
            </Protected>
          }
        />

        <Route
          path="/userprofile"
          element={
            <Protected allowedRole="user">
              <UserProfile />
            </Protected>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
