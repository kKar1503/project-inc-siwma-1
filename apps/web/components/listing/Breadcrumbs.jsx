import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

/**
 * A component that displays the current path as a breadcrumb
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
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

const propTypes = {
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;
