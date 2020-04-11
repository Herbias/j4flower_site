function BottomNavigation({ props }) {
  return (
    <div className="flex justify-start items-center w-full px-6 border-t border-b border-teal-400 bg-white text-black">
      <div className="py-2 px-4 bg-teal-400 font-semibold text-xl text-white">
        Occasions
      </div>
      <div className="py-2 px-4 text-teal-400">Birthday</div>
      <div className="py-2 px-4 text-teal-400">Valentines</div>
    </div>
  );
}

export default BottomNavigation;
