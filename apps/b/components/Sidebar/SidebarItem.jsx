import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * Parses a sidebar item
 * @param {object} sidebarItem The sidebar item to parse
 * @returns The sidebar item's label, link and subpages (if any)
 */
export function parseSidebarItem(sidebarItem) {
  // Retrieve the label, link and the sub-pages of the sidebar item
  const label = Object.keys(sidebarItem)[0];
  const link = typeof sidebarItem[label] === 'string' ? sidebarItem[label] : '/';
  const subPages = typeof sidebarItem[label] !== 'string' ? sidebarItem[label] : undefined;

  return { label, link, subPages };
}

/**
 * Navigation item for the sidebar
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const SidebarItem = ({ label, link, selected, subPages }) => {
  const [isSelected, setIsSelected] = useState(
    label === selected ||
      (subPages !== undefined && subPages.some((e) => Object.keys(e)[0] === selected))
  );
  const [isExpanded, setIsExpanded] = useState(isSelected);

  // Check if the sidebar item being rendered has any subpages
  if (subPages === undefined) {
    // The sidebar item has no subpages, render a standalone sidebar item
    return (
      <li className={cx('rounded-lg', { 'bg-primary text-white': isSelected })}>
        <Link className="font-medium px-8 rounded-lg" href={link}>
          {label}
        </Link>
      </li>
    );
  }

  // The sidebar item has subpages, render a dropdown to contain them instead
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div tabIndex="0" className={cx('collapse collapse-arrow')}>
      <input
        className="min-h-0"
        type="checkbox"
        defaultChecked={isExpanded}
        onChange={() => setIsExpanded(!isExpanded)}
      />
      <div
        className={cx('collapse-title min-h-0 py-3 font-medium rounded-lg px-8', {
          'bg-base-200': isSelected && isExpanded,
          'bg-primary text-white': isSelected && !isExpanded,
        })}
      >
        {label}
      </div>
      <ul className="collapse-content menu px-0">
        {
          /* Render the sub pages */
          subPages.map((subPage) => {
            // Parses the subpage
            const parsedSubPage = parseSidebarItem(subPage);

            return (
              <SidebarItem
                key={parsedSubPage.label}
                label={parsedSubPage.label}
                link={parsedSubPage.link}
                subPages={parsedSubPage.subPages}
                selected={selected}
              />
            );
          })
        }
      </ul>
    </div>
  );
};

const propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
  selected: PropTypes.string,
  subPages: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

SidebarItem.propTypes = propTypes;

export default SidebarItem;
