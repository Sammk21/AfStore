import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Breadcrumb.scss"

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((path) => path !== '');


  return (
  

<nav className="b-container">

  <nav className="breadcrumb ">
    <ul className="breadcrumb-list">
      <li className="breadcrumb-item">
        <Link to="/" className="breadcrumb-link">
          Home
        </Link>
      </li>
      {pathnames.map((path, index) => {
        const url = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <li className="breadcrumb-item" key={url}>
            <Link to={url} className="breadcrumb-link">
              {path}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>

</nav>
  );
};

export default Breadcrumb;
