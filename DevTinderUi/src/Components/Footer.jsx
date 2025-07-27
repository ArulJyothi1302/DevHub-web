import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-neutral p-10 sticky bottom-0">
      <ul className="flex justify-between">
        <li><Link to="/">Dev Hub</Link></li>
        <li className="mx-10">We Respect Your Data</li>
        <li className="">
          <Link to="/privacy">Privact & Policy</Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
