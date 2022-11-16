import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import cx from 'classnames';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';
import supabase from '../../pages/api/supabase';

/**
 * Parses data retrieved from Supabase into a format accepted by the tables
 * @param {{}} data Data retrieved from Supabase
 * @returns {{id: number, profilePicture: Object, company: string, website: string, bio: string, isSelected: boolean}} Table-renderable data
 */
function parseData(data) {
  return data.map((e) => ({
    id: e.id,
    profilePicture:
      'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
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
  const [searchInput, setSearchInput] = useState('');

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

  // -- Prepare fetched data for rendering & processing -- //
  // Filter the companies retrieved based on the search input
  const filteredCompanies = isLoading
    ? []
    : data.data.filter((company) => company.name.toLowerCase().includes(searchInput.toLowerCase()));

  // Slice the array of companies so that only the ones on the currently selected page are rendered
  const companies = parseData(
    filteredCompanies.slice(selectedIndex * 10, (selectedIndex + 1) * 10)
  );

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
    // Retrieve the checked state of the element, as well as the name of the row
    const { checked, name } = element;

    // Ids retrieved from Supabase are stored as an integer, but names retrieved from checkboxes are strings
    // Convert the name retrived from the checkbox to an integer, so that it can be used as the id
    const id = Number(name);

    // Update the selectedRows state
    // Checks if the row has been unselected
    if (!checked && selectedRows.includes(id)) {
      // The checkbox is no longer checked, remove the row from selectedRows
      const result = [...selectedRows].filter((value) => value !== id);

      // Update the state with the updated array
      setSelectedRows(result);
    }

    // Checks if the row has been selected
    if (checked && !selectedRows.includes(id)) {
      // The checkbox has been selected, convert the value to a number and add the row to selectedRows
      const result = [...selectedRows];
      result.push(Number(id));

      // Update the state with the updated array
      setSelectedRows(result);
    }
  };

  /**
   * Checks that all selected companies are suspended
   * @returns Whether or not all currently selected companies are suspended
   */
  const selectedAreSuspended = () =>
    selectedRows.every((id) => data.data.find((f) => f.id === id).visible === 0);

  /**
   * Checks that all selected companies are not suspended
   * @returns Whether or not all currently selected companies are not suspended
   */
  const selectedAreNotSuspended = () =>
    selectedRows.every((id) => data.data.find((f) => f.id === id).visible === 1);

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
    const buttonCount = filteredCompanies.length / 10;

    // Initialise an array of buttons
    const buttons = [];

    // Render x number of buttons
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < buttonCount; i++) {
      buttons.push(
        <TableButton
          index={i}
          key={`pagination-btn-${i}`}
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
            <h1 className="pr-2">
              Showing {isLoading ? 0 : Math.min(selectedIndex * 10 + 1, data.data.length)} to{' '}
              {isLoading ? 0 : Math.min((selectedIndex + 1) * 10, data.data.length)} of{' '}
              {isLoading ? 0 : data.data.length} entries
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search by name" value={searchInput} setValue={setSearchInput} />
          </div>
        </div>
      }
      headings={['Company', 'Website', 'Bio', 'Operational']}
      headingColor="bg-primary"
      showCheckbox
      className={className}
      columnKeys={['company', 'website', 'bio', 'visible']}
      centerColumns={['Operational']}
      selectedRows={selectedRows}
      isLoading={isLoading}
      data={companies}
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
