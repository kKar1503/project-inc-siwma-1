// ------------------ Imports ------------------

import { node, string } from 'prop-types';
import { useRouter } from 'next/router';

/**
 * SubMenuItem is a drawer item that is displayed by a MenuItem
 * @type {React.FC<import('prop-types').InferProps<typeof SidebarSubItem.propTypes>>}
 */
const SidebarSubItem = ({ name, customIcon, redirectLink }) => {
  // ------------------ Misc -----------------
  const router = useRouter();

  // ------------------ Handles -----------------
  const redirect = () => {
    router.push(redirectLink);
  };

  // ------------------ Return -----------------
  return (
    <div role="presentation" onClick={redirect}>
      {customIcon && <customIcon />}
      <h1 className="cursor-pointer p-2 hover:bg-primary-focus rounded-md mt-1">{name}</h1>
    </div>
  );
};

SidebarSubItem.propTypes = {
  name: string.isRequired,
  customIcon: node,
  redirectLink: string,
};

export default SidebarSubItem;
