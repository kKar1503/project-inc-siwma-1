import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQueries, useQueryClient } from 'react-query';
import Image from 'next/image';
import { HiDotsVertical } from 'react-icons/hi';
import cx from 'classnames';
import { getAllCompanies, getCompanyCount } from '@inc/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

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
  // Initialise supabase client
  const supabase = useSupabaseClient();

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
          supabase,
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
          supabase,
          from: selectedIndex * 10,
          to: (selectedIndex + 1) * 9,
          matching: searchInput,
        }),
    },
  ]);

  // -- Prepare fetched data for rendering & processing -- //
  // Set isLoading to true if any of the queries are still loading or has errored
  const isLoading = queries.some((e) => e.isLoading);

  // Destructure query data
  const [companyCountQuery, companiesQuery] = queries;

  // Retrieve query data
  const companyCount = isLoading || !companyCountQuery.data ? 0 : companyCountQuery.data.count;
  const companies =
    isLoading || !companiesQuery.data.data ? [] : parseData(companiesQuery.data.data);

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
   * Handles for when a table item is selected/unselected
   * @param {{}} targetCompany The company that was selected/unselected
   * @param {boolean} isSelected Whether or not the company was selected/unselected
   */
  const onChangeHandler = (targetCompany, isSelected) => {
    // -- Update the selectedCompanies state -- //
    // Checks if the company was already selected, and has now been unselected
    if (!isSelected && selectedCompanies.find((company) => company.id === targetCompany.id)) {
      // The company has been unselected, remove the company from selectedCompanies
      const result = [...selectedCompanies].filter((company) => company.id !== targetCompany.id);

      // Update the state with the updated array
      setselectedCompanies(result);
    }

    // Checks if the company has been selected
    if (isSelected && !selectedCompanies.find((company) => company.id === targetCompany.id)) {
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

  // column declaration
  const innerImage = (props) => (
    <div className="w-10 h-10 mr-4">
      <Image
        // remove later
        // eslint-disable-next-line react/prop-types
        src={props.row.original.profilePicture}
        alt="Profile Picture"
        layout="fill"
        width={100}
        height={100}
        className="rounded-full aspect-square object-cover"
      />
    </div>
  );
  const registeredCompaniesColumns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'profilePicture',
        Cell: (props) => innerImage(props),
      },
      {
        Header: 'COMPANY',
        accessor: 'company',
      },
      {
        Header: 'WEBSITE',
        accessor: 'website',
      },
      {
        Header: 'BIO',
        accessor: 'bio',
      },
    ],
    []
  );
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
      columns={registeredCompaniesColumns}
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
  className: PropTypes.string,
};

export default RegisteredCompaniesTable;
