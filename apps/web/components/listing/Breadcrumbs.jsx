import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const Breadcrumbs = ({ paths }) => (
  <div className="text-lg breadcrumbs">
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      {paths.map((p) => (
        <li key={p.path + p.name}>
          <Link href={`${p.path}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

Breadcrumbs.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumbs;
