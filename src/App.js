import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ================= AUTH =================
import { useAuth } from "./context/AuthContext";

// ================= LAYOUT =================
import Sidebar from "./components/common/Sidebar";
import FooterNav from "./components/common/FooterNav";
import Navbar from "./components/common/Navbar";

// ================= AUTH PAGES =================
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Unauthorized from "./pages/auth/Unauthorized";

// ================= CORE =================
import Home from "./features/home/Page/Home";
import ServicesPage from "./pages/services/ServicesPage";

// ================= PROFILE =================
import ProfileDashboard from "./features/profile/pages/ProfileDashboard";
import EditProfilePage from "./features/profile/pages/EditProfile";
import AddressManager from "./features/profile/pages/AddressManager";
import SecuritySettings from "./features/profile/pages/SecuritySettings";
import NotificationSettings from "./features/profile/pages/NotificationSettings";
import Preferences from "./features/profile/pages/Preferences";

// ================= PROVIDERS =================
import ProvidersList from "./features/profile/providers/ProvidersList";
import ProviderProfileView from "./features/profile/pages/ProviderProfile";
import ProviderPage from "./features/profile/providers/ProviderPage";
import ProviderRegister from "./features/profile/providers/ProviderRegister";

// ================= PROVIDER DASHBOARD =================
import ProviderLayout from "./providers/layout/ProviderLayout";
import ProviderDashboard from "./providers/pages/Dashboard";
import ProviderProfile from "./providers/pages/Profile";
import ProviderEditProfile from "./providers/pages/EditProfile";
import ProviderJobs from "./providers/pages/Jobs";
import ProviderEarnings from "./providers/pages/Earnings";
import ProviderReviews from "./providers/pages/Reviews";

// ================= BOOKINGS =================
import MyBookings from "./features/bookings/MyBookings";
import ScheduleBooking from "./features/bookings/ScheduleBooking";
import Messages from "./features/bookings/Messages";
import BookAppointment from "./features/bookings/BookAppointment";
import BookingConfirmation from "./features/bookings/BookingConfirmation";

// ================= CHAT =================
import ChatPage from "./features/chat/pages/ChatPage";

// ================= WALLET =================
import Wallet from "./pages/wallet/WalletPage";

// ================= ACCOUNT =================
import InboxPage from "./pages/account/InboxPage";
import OrdersPage from "./pages/account/OrdersPage";
import RatingsPage from "./pages/account/RatingsPage";

// ================= TOOLS =================
import WalletTopupPage from "./pages/tools/WalletTopupPage";
import HelpPage from "./pages/tools/HelpPage";

// ================= SUPPORT =================
import SupportHome from "./pages/tools/SupportHome";
import HelpCenter from "./pages/tools/HelpCenter";
import ContactSupport from "./pages/tools/ContactSupport";
import AIAssistantPage from "./pages/tools/AIAssistantPage";
import SupportTickets from "./pages/tools/SupportTickets";

// ================= TRACKING =================
import TrackingPage from "./features/bookings/page/TrackingPage";

// ================= ADMIN =================
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import Users from "./admin/pages/Users";
import Providers from "./admin/pages/Providers";
import Bookings from "./admin/pages/Bookings";
import Analytics from "./admin/pages/Analytics";
import RealTimeDashboard from "./admin/pages/RealTimeDashboard";

// ================= NOT FOUND =================
const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: 50 }}>
    <h2>404 - Page Not Found</h2>
  </div>
);

// ================= PROTECTED ROUTE =================
const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// ================= MAIN LAYOUT =================
const MainLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: 20 }}>
          <Outlet />
        </div>

        <FooterNav />
      </div>
    </div>
  );
};

// ================= APP WRAPPER =================
function AppWrapper() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading HomiCare...</div>;
  }

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ================= PROTECTED ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          {/* CORE */}
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesPage />} />

          {/* PROFILE */}
          <Route path="profile" element={<ProfileDashboard />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
          <Route path="profile/address" element={<AddressManager />} />
          <Route path="profile/security" element={<SecuritySettings />} />
          <Route path="profile/notifications" element={<NotificationSettings />} />
          <Route path="profile/preferences" element={<Preferences />} />

          {/* PROVIDERS */}
          <Route path="providers" element={<ProvidersList />} />
          <Route path="providers/:id" element={<ProviderProfileView />} />
          <Route path="provider/:categoryName" element={<ProviderPage />} />
          <Route path="provider-register" element={<ProviderRegister />} />

          {/* PROVIDER DASHBOARD */}
          <Route path="provider" element={<ProviderLayout />}>
            <Route path="dashboard" element={<ProviderDashboard />} />
            <Route path="profile" element={<ProviderProfile />} />
            <Route path="profile/edit" element={<ProviderEditProfile />} />
            <Route path="jobs" element={<ProviderJobs />} />
            <Route path="earnings" element={<ProviderEarnings />} />
            <Route path="reviews" element={<ProviderReviews />} />
          </Route>

          {/* BOOKINGS */}
          <Route path="bookings" element={<MyBookings />} />
          <Route path="bookings/schedule" element={<ScheduleBooking />} />
          <Route path="bookings/messages" element={<Messages />} />
          <Route path="book/:id" element={<BookAppointment />} />
          <Route path="booking-confirmation" element={<BookingConfirmation />} />

          {/* CHAT */}
          <Route path="messages" element={<ChatPage />} />

          {/* WALLET */}
          <Route path="wallet" element={<Wallet />} />

          {/* ACCOUNT */}
          <Route path="account/inbox" element={<InboxPage />} />
          <Route path="account/orders" element={<OrdersPage />} />
          <Route path="account/ratings" element={<RatingsPage />} />

          {/* TOOLS */}
          <Route path="tools/wallet-topup" element={<WalletTopupPage />} />
          <Route path="tools/help" element={<HelpPage />} />

          {/* SUPPORT */}
          <Route path="support" element={<SupportHome />} />
          <Route path="support/help" element={<HelpCenter />} />
          <Route path="support/contact" element={<ContactSupport />} />
          <Route path="support/ai" element={<AIAssistantPage />} />
          <Route path="support/tickets" element={<SupportTickets />} />

          {/* TRACKING */}
          <Route path="tracking" element={<TrackingPage />} />

          {/* ADMIN */}
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="providers" element={<Providers />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="realtime" element={<RealTimeDashboard />} />
          </Route>

          {/* UNAUTHORIZED */}
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* ❗ FIXED: proper 404 instead of redirect loop */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;