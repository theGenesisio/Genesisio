import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavbarHome from "./components/layout/NavbarHome";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Chatbot from "./components/layout/Chatbot";
import NotFound from "./components/pages/NotFound";
import Landing from "./components/pages/Landing";
import Dashboard from "./components/pages/Dashboard";
import Deposit from "./components/pages/Deposit";
import Withdrawal from "./components/pages/Withdrawal";
import ChooseNetwork from "./components/pages/ChooseNetwork";
import Markets from "./components/pages/Markets";
import MyAssets from "./components/pages/MyAssets";
import Packages from "./components/pages/Packages";
import Records from "./components/pages/Records";
import Profile from "./components/pages/Profile";
import TermsNConditions from "./components/pages/TermsNConditions";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
import ConfirmEmail from "./components/auth/ConfirmEmail";
import ConfirmCode from "./components/auth/ConfirmCode";
import ForgotPassword from "./components/auth/ForgotPassword";
import Logout from "./components/auth/Logout";
import Ticker from "./components/subcomponents/TradeviewWidget/Ticker";
import Tickertape from "./components/subcomponents/TradeviewWidget/Tickertape";
import ProtectedRoute from "./ProtectedRoute";
import CheckAuth from "./checkAuth";
import CheckAdmin from "./components/admin/subCmponents/checkAdmin";
import ProtectedAdmin from "./components/admin/subCmponents/ProtectedAdmin";
import AdminNavbar from "./components/admin/adminNavbar";
import AdminDashboard from "./components/admin/adminDashboard";
import AdminDeposits from "./components/admin/adminDeposits";
import AdminNetworks from "./components/admin/adminNetworks";
import AdminProfiles from "./components/admin/adminProfiles";
import AdminWithdrawals from "./components/admin/adminWithdrawals";
import AdminSignIn from "./components/admin/adminSignIn";
import AdminUpgrade from "./components/admin/adminUpgrade";
import Upgrade from "./components/pages/Upgrade";
import AdminPackages from "./components/admin/adminPackages";
export default function Router() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Ticker />
        <Outlet />
        <Chatbot />
        <Tickertape />
        <Footer />
      </>
    );
  };
  const LayoutOne = () => {
    return (
      <>
        <NavbarHome />
        <Tickertape />
        <Outlet />
        <Chatbot />
        <Footer />
      </>
    );
  };
  const Auth = () => {
    return (
      <>
        <Outlet />
        <Chatbot />
      </>
    );
  };
  const AdminAuth = () => {
    return (
      <>
        <Outlet />
        <Chatbot />
      </>
    );
  };
  const Admin = () => {
    return (
      <>
        <AdminNavbar />
        <Tickertape />
        <Outlet />
        <Footer />
      </>
    );
  };
  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <LayoutOne />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "terms",
          element: <TermsNConditions />,
        },
      ],
    },
    {
      path: "/genesisio",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "deposit",
          element: <ChooseNetwork />,
        },
        {
          path: "deposit/:network",
          element: <Deposit />,
        },
        {
          path: "markets",
          element: <Markets />,
        },
        {
          path: "withdrawals",
          element: <Withdrawal />,
        },
        {
          path: "packages",
          element: <Packages />,
        },
        {
          path: "upgrade",
          element: <Upgrade />,
        },
        {
          path: "My Assets",
          element: <MyAssets />,
        },
        {
          path: "Records",
          element: <Records />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "",
          element: (
            <CheckAuth>
              <SignIn />
            </CheckAuth>
          ),
        },
        {
          path: "sign-in",
          element: (
            <CheckAuth>
              <SignIn />
            </CheckAuth>
          ),
        },
        {
          path: "logout",
          element: <Logout />,
        },
        {
          path: "sign-up",
          element: (
            <CheckAuth>
              <SignUp />
            </CheckAuth>
          ),
        },
        {
          path: "confirm-email",
          element: (
            <CheckAuth>
              <ConfirmEmail />
            </CheckAuth>
          ),
        },
        {
          path: "confirm-code",
          element: <ConfirmCode />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "/admin/auth",
      element: (
        <CheckAdmin>
          <AdminAuth />
        </CheckAdmin>
      ),
      children: [
        {
          path: "",
          element: <AdminSignIn />,
        },
        {
          path: "sign-in",
          element: <AdminSignIn />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedAdmin>
          <Admin />
        </ProtectedAdmin>
      ),
      children: [
        {
          path: "",
          element: <AdminDashboard />,
        },
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "deposits",
          element: <AdminDeposits />,
        },
        {
          path: "upgrade",
          element: <AdminUpgrade />,
        },
        {
          path: "packages",
          element: <AdminPackages />,
        },
        {
          path: "networks",
          element: <AdminNetworks />,
        },
        {
          path: "profiles",
          element: <AdminProfiles />,
        },
        {
          path: "withdrawals",
          element: <AdminWithdrawals />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={BrowserRouter} />;
}
