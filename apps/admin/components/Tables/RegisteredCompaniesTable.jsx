import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQueries, useQueryClient } from 'react-query';
import cx from 'classnames';
import { getAllCompanies, getCompanyCount } from '@inc/database';
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
  const [selectedCompanies, setselectedCompanies] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // -- Queries Supabase --//
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  // Run all supabase queries in parallel
  const queries = useQueries([
    {
      // Fetches the total number of companies from supabase
      queryKey: ['getCompanyCount', { matching: searchInput }],
      keepPreviousData: true,
      queryFn: async () =>
        getCompanyCount({
          matching: searchInput,
        }),
    },
    {
      // Fetches companies from supabase
      queryKey: [
        'getAllCompanies',
        { from: selectedIndex * 10, to: (selectedIndex + 1) * 9, matching: searchInput },
      ],
      keepPreviousData: true,
      queryFn: async () =>
        getAllCompanies({
          from: selectedIndex * 10,
          to: (selectedIndex + 1) * 9,
          matching: searchInput,
        }),
    },
  ]);

  // -- Prepare fetched data for rendering & processing -- //
  // Set isLoading to true if any of theq queries are still loading
  const isLoading = queries.some((e) => e.isLoading);

  // Destructure query data
  const [companyCountQuery, companiesQuery] = queries;

  // Retrieve query data
  const companyCount = isLoading ? 0 : companyCountQuery.data.count;
  const companies = isLoading ? [] : parseData(companiesQuery.data.data);

  // -- Data fetch/update functions --//
  /**
   * Reinstates selected companies
   */
  const reinstateCompanies = async () => {
    // Set the 'visible' column of every selected company to true
    await supabase
      .from('companies')
      .update({ visible: 1 })
      .in(
        'id',
        selectedCompanies.map((e) => e.id)
      );

    // Invalidate old query to cause a refetch
    queryClient.invalidateQueries({ queryKey: ['getAllCompanies'] });

    // Update the visible property of every company in the selectedCompanies array
    setselectedCompanies(selectedCompanies.map((e) => ({ ...e, visible: true })));
  };

  /**
   * Suspends selected companies
   */
  const suspendCompanies = async () => {
    // Set the 'visible' column of every selected company to false
    await supabase
      .from('companies')
      .update({ visible: 0 })
      .in(
        'id',
        selectedCompanies.map((e) => e.id)
      );

    // Invalidate old query to cause a refetch
    queryClient.invalidateQueries({ queryKey: ['getAllCompanies'] });

    // Update the visible property of every company in the selectedCompanies array
    setselectedCompanies(selectedCompanies.map((e) => ({ ...e, visible: false })));
  };

  // -- Logic functions -- //
  /**
   * Handles for when a table item is checked/unchecked
   * @param {{}} element The element that was checked/unchecked
   */
  const onChangeHandler = (element) => {
    // Retrieve the checked state of the element, as well as the id of the company the row represents
    const { checked, name: id } = element;

    // Ids retrieved from Supabase are stored as an integer, but names retrieved from checkboxes are strings
    // Convert the name retrived from the checkbox to an integer, so that it can be used to retrieve the target company
    const targetCompany = companies.find((e) => e.id === Number(id));

    // -- Update the selectedCompanies state -- //
    // Checks if the company was already selected, and has now been unselected
    if (!checked && selectedCompanies.find((company) => company.id === targetCompany.id)) {
      // The company has been unselected, remove the company from selectedCompanies
      const result = [...selectedCompanies].filter((company) => company.id !== targetCompany.id);

      // Update the state with the updated array
      setselectedCompanies(result);
    }

    // Checks if the company has been selected
    if (checked && !selectedCompanies.find((company) => company.id === targetCompany.id)) {
      // The company has been selected, add it to the selectedCompanies array
      const result = [...selectedCompanies];
      result.push(targetCompany);

      // Update the state with the updated array
      setselectedCompanies(result);
    }
  };

  /**
   * Checks that all selected companies are suspended
   * @returns Whether or not all currently selected companies are suspended
   */
  const selectedAreSuspended = () => selectedCompanies.every((e) => e.visible === false);

  /**
   * Checks that all selected companies are not suspended
   * @returns Whether or not all currently selected companies are not suspended
   */
  const selectedAreNotSuspended = () => selectedCompanies.every((e) => e.visible === true);

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
    const buttonCount = companyCount / 10;

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
            {isLoading ? (
              <h1 className="pr-2">Showing 0 to 0 of 0 entries</h1>
            ) : (
              <h1 className="pr-2">
                Showing {Math.min(selectedIndex * 10 + 1, companyCount)} to{' '}
                {Math.min((selectedIndex + 1) * 10, companyCount)} of {companyCount} entries
              </h1>
            )}
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
      // We only need to pass in an array of the ids of the companies that have been selected
      selectedRows={selectedCompanies.map((e) => e.id)}
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
              disabled={!isLoading && selectedCompanies.length > 0 ? !selectedAreSuspended() : true}
            >
              REINSTATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={suspendCompanies}
              // Disable the button if one or more of the companies selected are suspended
              disabled={
                !isLoading && selectedCompanies.length > 0 ? !selectedAreNotSuspended() : true
              }
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
