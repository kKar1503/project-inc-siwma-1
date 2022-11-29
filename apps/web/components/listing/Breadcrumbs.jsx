import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Breadcrumbs = ({ paths }) => (
  <div className="text-lg breadcrumbs">
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li key={paths[0] + 1}>
        <Link href={`/category/${paths[0]}`}>{paths[0]}</Link>
      </li>
      <li key={paths[1] + 1}>
        <Link href={`/products/${paths[1]}`}>{paths[1]}</Link>
      </li>
    </ul>
  </div>
);

Breadcrumbs.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Breadcrumbs;
