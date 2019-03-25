import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import logo from '../../static/logo.png';

function PageLayout({ children, navLinks }) {
  return (
    <div className="Page-Layout">
      <header>
        <img src={logo} alt="Company logo" className="Logo" />
        <nav>{navLinks}</nav>
      </header>
      <main>{children}</main>
      <footer>© Copyright 2019</footer>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  navLinks: PropTypes.arrayOf(PropTypes.node),
};

PageLayout.defaultProps = {
  navLinks: [],
};

export default PageLayout;
