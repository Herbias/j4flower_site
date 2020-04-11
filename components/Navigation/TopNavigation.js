function TopNavigation({ props }) {
  return (
    <div className="flex justify-center w-full m-auto absolute top-0">
      <div className="border rounded-b-lg border-gray-300 text-sm p-1">
        <a className="ml-2 mr-2" href="#">
          Login
        </a>
        <a className="mr-2" href="#">
          Signup
        </a>
        <a className="mr-2" href="#">
          How To Order
        </a>
        <a className="mr-2" href="#">
          Contact
        </a>
        <a className="mr-2" href="#">
          About
        </a>
      </div>
    </div>
  );
}

export default TopNavigation;
