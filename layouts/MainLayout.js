import TopNavigation from "../components/Navigation/TopNavigation";
import MiddleNavigation from "../components/Navigation/MiddleNavigation";
import BottomNavigation from "../components/Navigation/BottomNavigation";

export default function MainLayout(props) {
  return (
    <>
      <nav className="flex justify-between flex-wrap bg-nav text-white">
        <TopNavigation />
        <MiddleNavigation />
        <BottomNavigation />
      </nav>
      {props.children}
    </>
  );
}
