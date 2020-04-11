import TopNavigation from "../components/Navigation/TopNavigation";
import MiddleNavigation from "../components/Navigation/MiddileNavigation";
import BottomNavigation from "../components/Navigation/BottomNavigation";

export default function MainLayout(props) {
  return (
    <nav className="flex justify-between flex-wrap bg-nav text-white">
      <TopNavigation />
      <MiddleNavigation />
      <BottomNavigation />
    </nav>
  );
}
