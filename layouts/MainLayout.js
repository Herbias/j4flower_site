import TopNavigation from "../components/Navigation/TopNavigation";
import MiddleNavigation from "../components/Navigation/MiddleNavigation";
import BottomNavigation from "../components/Navigation/BottomNavigation";
import Footer from "../components/Footer/Footer";
import { useUserManagementHook } from "../hooks/userManagementHook";

export default function MainLayout(props) {
  useUserManagementHook();
  return (
    <>
      <nav className="flex justify-between flex-wrap bg-nav text-white">
        <TopNavigation />
        <MiddleNavigation />
        <BottomNavigation />
      </nav>
      {props.children}
      <Footer />
    </>
  );
}
