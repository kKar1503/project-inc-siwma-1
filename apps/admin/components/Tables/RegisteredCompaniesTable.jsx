import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQueries, useQueryClient } from 'react-query';
import cx from 'classnames';
import { getAllCompanies, getCompanyCount } from '@inc/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Alert } from '@inc/ui';
import AlertManager from '@inc/ui/alerts/AlertManager';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';
import TablePagination from './TablePagination';
import CompanyActionMenu from './actionMenus/CompanyActionMenu';
import CompanyDelete from '../Modals/CompanyDelete';

/**
 * Parses data retrieved from Supabase into a format accepted by the tables
 * @param {{}} data Data retrieved from Supabase
 * @returns {{id: number, profilePicture: Object, company: string, website: string, bio: string, isSelected: boolean}} Table-renderable data
 */
function parseData(data) {
  return data.map((e) => ({
    id: e.id,
    profilePicture: `${process.env.NEXT_PUBLIC_COMPANY_BUCKET_URL}${e.image || 'example.jpg'}`,
    company: e.name,
    website: e.website,
    bio: e.bio && e.bio.length > 60 ? `${e.bio.substring(0, 59)}...` : e.bio,
    visible: e.visible === 1,
  }));
}

// This table shows Registered Companies and is built on the BaseTable component.
const RegisteredCompaniesTable = ({ className }) => {
  // Set states
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCompanies, setselectedCompanies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [deleteModalData, setDeleteModalData] = useState(null);

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
      refetchInterval: 60000, // Refresh every minute
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
      refetchInterval: 60000, // Refresh every minute
      queryFn: async () =>
        getAllCompanies({
          supabase,
          from: selectedIndex * 10,
          to: (selectedIndex + 1) * 10 - 1,
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

  // Check if the selected pagination index is out of bounds
  if (selectedIndex > 0 && (selectedIndex + 1) * 10 > Math.ceil(companyCount / 10) * 10)
    // It is out of bounds, set the selected index to be that of the last button
    setSelectedIndex(Math.floor(companyCount / 10));

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

  // -- Handler functions -- //
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
   * Handles for when a company is deleted
   * @param {{id: number, profilePicture: Object, company: string, website: string, bio: string, isSelected: boolean}} data Data pertaining to the company that has been deleted
   */
  const onDeleteHandler = async (data) => {
    // Close the modal
    setDeleteModalData(null);

    // Attempt to delete the company
    const { error } = await supabase.from('companies').delete().eq('id', data.id);

    // Check if the company was successfully deleted
    if (error) {
      // An error occured while trying to delete the company, show an error alert
      const $alerts = [
        ...alerts,
        <Alert
          level="error"
          message="An error occurred while trying to delete the company. Please try again later."
          dismissable
        />,
      ];

      setAlerts($alerts);
      return;
    }

    // The company was successfully deleted, invalidate old query to cause a refetch
    queryClient.invalidateQueries({ queryKey: ['getAllCompanies'] });

    // Show a success alert
    const $alerts = [
      ...alerts,
      <Alert level="success" message="Company deleted successfully" dismissable />,
    ];

    setAlerts($alerts);
  };

  /**
   * Closes an alert
   * @param {number} index The index of the alert to close
   */
  const onCloseAlert = (index) => {
    const $alerts = [...alerts];
    $alerts.splice(index, 1);

    setAlerts($alerts);
  };

  // -- Logic functions -- //
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

  return (
    <>
      {/* Company deletion modal */}
      <CompanyDelete
        isOpen={Boolean(deleteModalData)}
        company={deleteModalData}
        onConfirm={onDeleteHandler}
        onRequestClose={() => setDeleteModalData(null)}
      />

      {/* Main Content */}
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
              <SearchBar
                placeholder="Search by name"
                value={searchInput}
                setValue={setSearchInput}
              />
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
        actionMenu={<CompanyActionMenu data={{}} onDelete={setDeleteModalData} />}
        footer={
          <div className="flex justify-between bg-none">
            {/* Company suspension/reinstation */}
            <div className="flex gap-3">
              <button
                className="btn btn-primary text-white"
                onClick={reinstateCompanies}
                // Disable the button if one or more of the companies selected are not suspended
                disabled={
                  !isLoading && selectedCompanies.length > 0 ? !selectedAreSuspended() : true
                }
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
                <TablePagination
                  rows={companyCount}
                  rowsPerPage={10}
                  selectedIndex={selectedIndex}
                  onChange={setSelectedIndex}
                  isLoading={isLoading}
                />
              }
            </div>
          </div>
        }
      />

      {/* Table Alerts */}
      <AlertManager maxAlerts={3} alerts={alerts} onRequestClose={onCloseAlert} />
    </>
  );
};

RegisteredCompaniesTable.propTypes = {
  className: PropTypes.string,
};

export default RegisteredCompaniesTable;