import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/**
 * Parses a sidebar item
 * @param {object} sidebarItem The sidebar item to parse
 * @returns The sidebar item's label, link and subpages (if any)
 */
export function parseSidebarItem(sidebarItem) {
  // Retrieve the label, and its value from the sidebar item
  const label = Object.keys(sidebarItem)[0];
  const labelValue = sidebarItem[label];

  // Determine whether the value is a link or an array of subpages
  const link = typeof labelValue === 'string' ? labelValue : '/';
  const subPages = Array.isArray(labelValue) ? labelValue : undefined;

  return { label, link, subPages };
}

/**
 * Navigation item for the sidebar
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const SidebarItem = ({ label, link, selected, subPages }) => {
  /**
   * Determines whether or not the component (or any component within it) is selected
   */
  const checkSelected = () =>
    label === selected ||
    (subPages !== undefined && subPages.some((e) => Object.keys(e)[0] === selected));

  /**
   * There are two variants to the SidebarItem component
   * 1. A regular navigation button
   * 2. A collapsible dropdown list that can contain other SidebarItems
   *
   * Depending on the variant being rendered, the isSelected state is used differently
   * Variant 1 - isSelected is used to determine whether or not the SidebarItem should be rendered in its selected state (bg-primary, text-white)
   * Variant 2 - isSelected is used to determine whether or not the dropdown list contains any selected items
   *
   * In Variant 2, should the dropdown list contain a selected item, the SidebarItem being rendered will have a grey background applied (bg-base-300)
   * when it is expanded, and the primary background applied (bg-primary) when collapsed.
   *
   * This is done to indicate to the user, when the SidebarItem is collapsed, that an item within it is selected
   */
  const [isSelected, setIsSelected] = useState(checkSelected());
  const [isExpanded, setIsExpanded] = useState(isSelected);

  /**
   * Listens for any changes to the selected prop so that the isSelected state can be updated when necessary
   */
  useEffect(() => {
    setIsSelected(checkSelected());
  }, [selected]);

  // Check if the sidebar item being rendered has any subpages
  if (subPages === undefined) {
    // The sidebar item has no subpages, render a standalone sidebar item
    return (
      <li className={cx('rounded-lg mt-1.5', { 'bg-primary text-white': isSelected })}>
        <Link className="font-medium px-8 rounded-lg py-2.5" href={link}>
          {label}
        </Link>
      </li>
    );
  }

  // The sidebar item has subpages, render a dropdown to contain them instead
  return (
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex="0"
      className={cx('collapse collapse-arrow rounded-lg mt-1.5', {
        'bg-base-200': isSelected || isExpanded,
      })}
    >
      <input
        className="min-h-0"
        type="checkbox"
        defaultChecked={isExpanded}
        onChange={() => setIsExpanded(!isExpanded)}
      />
      <div
        className={cx('collapse-title min-h-0 font-medium rounded-lg px-8 py-2.5', {
          'bg-base-300 rounded-b-none': isExpanded,
          'bg-primary text-white': isSelected && !isExpanded,
        })}
      >
        {label}
      </div>
      <ul
        className="collapse-content menu px-2 py-0 flex-nowrap"
        style={{ paddingBottom: isExpanded ? '0.375rem' : '0rem' }}
      >
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
