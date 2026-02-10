import { createBrowserRouter } from "react-router";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import HostingDashboard from "../pages/HostingDashboard/HostingDashboard";
import Earnings from "../pages/Earnings/Earnings";
import Reservations from "../pages/Reservations/Reservations";
import IndividualEarnings from "../components/IndividualEarnings/IndividualEarnings";
import Listings from "../pages/Listings/Listings";
import Resorts from "../pages/Resorts/Resorts";
import Profile from "../pages/Profile/Profile";
import AdminPanel from "../layout/AdminPanel/AdminPanel";
import AdminOverview from "../pages/AdminOverview/AdminOverview";
import AdminControl from "../pages/AdminControl/AdminControl";
import UpdateEarnings from "../pages/UpdateEarnings/UpdateEarnings";
import UserControl from "../pages/UserControl/UserControl";
import NotFoundPage from "../pages/NotFoundPage/notFoundPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/registration',
        element: <Registration />
      },
      {
        path: '/resorts',
        element: <Resorts />
      }
    ]
  },
  {
    path: 'hosting-dashboard',
    element: <HostingDashboard />,
    children: [
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'earnings',
        element: <Earnings />
      },
      {
        path: 'individual-earnings/:id',
        element: <IndividualEarnings />
      },
      {
        path: 'reservation',
        element: <Reservations />
      },
      {
        path: 'listings',
        element: <Listings />
      },
      // Catch-all for hosting-dashboard routes
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  },
  {
    path: 'admin-panel',
    element: <AdminPanel />,
    children: [
      {
        path: 'admin-overview',
        element: <AdminOverview />
      },
      {
        path: 'admin-control',
        element: <AdminControl />
      },
      {
        path: 'earnings-update',
        element: <UpdateEarnings />
      },
      {
        path: 'user-control',
        element: <UserControl />
      },
      // Catch-all for admin-panel routes
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  },
  // Global catch-all route - MUST be last
  {
    path: '*',
    element: <NotFoundPage />
  }
]);