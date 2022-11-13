import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import supabase from '../../pages/api/supabase';
import pic from '../../public/siwma-logo-sm.png';

/**
 * Parses data retrieved from Supabase into a format accepted by the tables
 * @param {{}} data Data retrieved from Supabase
 * @returns {{id: number, profilePicture: Object, company: string, website: string, bio: string, isSelected: boolean}} Table-renderable data
 */
function parseData(data) {
  return data.map((e) => ({
    id: e.id,
    profilePicture: pic,
    company: e.name,
    website: e.website,
    bio: e.bio,
    visible: e.visible === 1,
  }));
}

// This table shows Registered Companies and is built on the BaseTable component.
const RegisteredCompaniesTable = ({ className }) => {
  // Set states
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  // Fetches companies from supabase
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['companies'],
    queryFn: async () =>
      supabase
        .from('companies')
        .select('*')
        .order('visible', { ascending: false })
        .order('name', { ascending: true }),
  });

  // -- Data fetch/update functions --//
  /**
   * Reinstates selected companies
   */
  const reinstateCompanies = async () => {
    // Set the 'visible' column of every selected company to true
    await supabase.from('companies').update({ visible: 1 }).in('id', selectedRows);

    // Refetch data
    refetch();
  };

  /**
   * Suspends selected companies
   */
  const suspendCompanies = async () => {
    // Set the 'visible' column of every selected company to false
    await supabase.from('companies').update({ visible: 0 }).in('id', selectedRows);

    // Refetch data
    refetch();
  };

  // -- Logic functions -- //
  /**
   * Handles for when a table item is checked/unchecked
   * @param {{}} element The element that was checked/unchecked
   */
  const onChangeHandler = (element) => {
    // Retrieve the checked state of the element, as well as the id of the row
    const { checked, name } = element;

    // Update the selectedRows state
    // Checks if the row has been unselected
    if (!checked && selectedRows.includes(name)) {
      // The checkbox is no longer checked, remove the row from selectedRows
      const result = [...selectedRows].filter((value) => value !== name);

      // Update the state with the updated array
      setSelectedRows(result);
    }

    // Checks if the row has been selected
    if (checked && !selectedRows.includes(name)) {
      // The checkbox has been selected, add the row to selectedRows
      const result = [...selectedRows];
      result.push(name);

      // Update the state with the updated array
      setSelectedRows(result);
    }
  };

  /**
   * Checks that all selected companies are suspended
   * @returns Whether or not all currently selected companies are suspended
   */
  const selectedAreSuspended = () =>
    selectedRows.every((id) => data.data.find((f) => f.id === Number(id)).visible === 0);

  /**
   * Checks that all selected companies are not suspended
   * @returns Whether or not all currently selected companies are not suspended
   */
  const selectedAreNotSuspended = () =>
    selectedRows.every((id) => data.data.find((f) => f.id === Number(id)).visible === 1);

  // -- Render functions --//
  /**
   * Renders pagination buttons
   */
  const renderPagination = () => {
    // Checks if the data is still being fetched from supabase
    if (isLoading) {
      // Render a disabled pagination button
      return (
        <TableButton
          index={0}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-primary"
          className="rounded-lg hover:bg-primary"
        />
      );
    }

    // Data has already been fetched from supabase, determine the number of pagination buttons to be rendered
    const buttonCount = data.data.length / 10;

    // Initialise an array of buttons
    const buttons = [];

    // Render x number of buttons
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < buttonCount; i++) {
      buttons.push(
        <TableButton
          index={i}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-primary"
          // Make the left side of the first button and the right side of the last button rounded,
          // also make the entire button rounded if it is the only button
          className={cx('hover:bg-primary', {
            'rounded-l-lg': i === 0,
            'rounded-r-lg': i >= buttonCount - 1,
          })}
        />
      );
    }

    // Return the result
    return buttons;
  };

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Companies</h1>
            <h1 className="pr-2">Showing 1 to 10 of 100 entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['Company', 'Website', 'Bio', 'Operational']}
      headingColor="bg-primary"
      showCheckbox
      className={className}
      columnKeys={['company', 'website', 'bio', 'visible']}
      centerColumns={['Operational']}
      isLoading={isLoading}
      data={isLoading ? undefined : parseData(data.data.map((e) => ({ ...e, isSelected: true })))}
      onChange={onChangeHandler}
      footer={
        <div className="flex justify-between bg-none">
          {/* Company suspension/reinstation */}
          <div className="flex gap-3">
            <button
              className="btn btn-primary text-white"
              onClick={reinstateCompanies}
              // Disable the button if one or more of the companies selected are not suspended
              disabled={selectedRows.length > 0 ? !selectedAreSuspended() : true}
            >
              REINSTATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={suspendCompanies}
              // Disable the button if one or more of the companies selected are suspended
              disabled={selectedRows.length > 0 ? !selectedAreNotSuspended() : true}
            >
              SUSPEND SELECTED
            </button>
          </div>

          <div className="flex justify-end bg-none">
            {
              // Table pagination buttons
              renderPagination()
            }
          </div>
        </div>
      }
    />
  );
};

RegisteredCompaniesTable.propTypes = {
  // data: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     // eslint-disable-next-line react/forbid-prop-types
  //     profilePicture: PropTypes.object,
  //     company: PropTypes.string,
  //     website: PropTypes.string,
  //     bio: PropTypes.string,
  //   })
  // ),
  className: PropTypes.string,
};

export default RegisteredCompaniesTable;
