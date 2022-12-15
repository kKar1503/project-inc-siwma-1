import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQueries, useQueryClient, useQuery, useMutation } from 'react-query';
import cx from 'classnames';
import { getAllCompanies, getCompanyCount } from '@inc/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { SlPencil } from 'react-icons/sl';
import { BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import { BaseTable } from './BaseTable';
import SearchBar from '../SearchBar';
import TablePagination from './TablePagination';
import BaseTableCat from './BaseTableCat';
import AdsActionMenu from './AdsActionMenu';

/**
 * Parses data retrieved from Supabase into a format accepted by the tables
 * @param {{}} data Data retrieved from Supabase
 * @returns {{id: number, profilePicture: Object, company: string, website: string, bio: string, isSelected: boolean}} Table-renderable data
 */
function parseData(data) {
  return data.map((e) => ({
    id: e.id,
    company: e.name,
    clicks: e.clicks,
    email: e.email,
    active: e.active ? `Active` : `Disabled`,
  }));
}

// This table shows Registered Companies and is built on the BaseTable component.
const AdvertisementTable = ({ className }) => {
  // Set states
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCompanies, setselectedCompanies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [onChangeStatus, setOnChangeStatus] = useState([{ active: 'true', id: 0 }]);

  // -- Queries Supabase --//
  // Initialise supabase client
  const supabase = useSupabaseClient();

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const fetchAds = async () => supabase.rpc('get_active_ads');
  const { data, isFetching } = useQuery('ads', fetchAds);

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

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Advertisement</h1>
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
            <Link href="/AdminUpload" className="btn btn-outline btn-primary w-32 ">
              Add advertisement
            </Link>
          </div>
        </div>
      }
      headings={['Advertisement', 'Company', 'Clicks', 'Email', 'Status']}
      headingColor="bg-primary"
      // showCheckbox
      className={className}
      columnKeys={['advertisement', 'company', 'clicks', 'email', 'active']}
      centerColumns={['Clicks', 'Status']}
      // We only need to pass in an array of the ids of the companies that have been selected
      // selectedRows={selectedCompanies.map((e) => e.id)}
      isLoading={isLoading}
      data={data && data.data}
      onChange={onChangeHandler}
      actionMenu={<AdsActionMenu companyid={0} status={0} />}
      footer={
        <div className="flex justify-between bg-none">
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
  );
};

AdvertisementTable.propTypes = {
  className: PropTypes.string,
};

export default AdvertisementTable;
