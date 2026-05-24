import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppNavbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Forums from "./pages/Forums";
import CategoryThreads from "./pages/CategoryThreads";
import StaticPage from "./pages/StaticPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route path="/" element={<Forums />} />
        <Route path="/rules" element={<StaticPage slug="rules" />} />
        <Route path="/guidelines" element={<StaticPage slug="guidelines" />} />

        <Route path="/forums/:category" element={<CategoryThreads />} />

        <Route path="/feed" element={<Feed />} />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
