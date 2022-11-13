import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
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

  // Retrieve all companies from Supabase
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['companies'],
    queryFn: async () =>
      supabase
        .from('companies')
        .select('*')
        .order('visible', { ascending: false })
        .order('name', { ascending: true }),
  });

  // Suspends selected companies
  const suspendCompanies = async () => {
    // Set the 'visible' column of every selected company to false
    await supabase.from('companies').update({ visible: 0 }).in('id', selectedRows);

    // Refetch data
    refetch();
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
          <button
            className="btn btn-primary text-white"
            onClick={suspendCompanies}
            disabled={selectedRows.length === 0}
          >
            SUSPEND SELECTED
          </button>
          <div className="flex justify-end bg-none">
            {/* Table pagination buttons */}
            <TableButton
              index={0}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              className="rounded-l-lg hover:bg-primary"
            />
            <TableButton
              index={1}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              className="hover:bg-primary"
            />
            <TableButton
              index={2}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-primary"
              className="rounded-r-lg hover:bg-primary"
            />
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
