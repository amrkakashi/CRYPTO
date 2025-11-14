import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-999  bg-slate-950 flex justify-between items-center p-2 px-4">
      <div className="flex items-center gap-2 size-12">
        <img
          className="w-full h-full object-cover"
          src="https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/btc.png"
          alt=""
        />
      </div>
      <ul className="flex gap-4 text-gray-100">
        <li className="text-xl font-bold">
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
