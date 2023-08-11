import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 min-h-screen w-1/12">
      <div className="p-4">{/* Sidebar logo or icon */}</div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center p-2">
              <span className="text-white">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="flex items-center p-2">
              <span className="text-white">Contacts</span>
            </Link>
          </li>
          <li>
            <Link to="/dates" className="flex items-center p-2">
              <span className="text-white">Dates</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
