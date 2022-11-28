import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Breadcrumbs = ({ paths }) => (
  <div className="text-lg breadcrumbs">
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      {paths.map((subpath) => (
        <li key={subpath + 1}>
          <Link href={`/listing/${subpath}`}>{subpath}</Link>
        </li>
      ))}
    </ul>
  </div>
);

Breadcrumbs.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Breadcrumbs;
