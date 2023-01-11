import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useQueries, useQueryClient, useQuery, useMutation } from 'react-query';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTable } from './BaseTable';
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
    advertisement: e.description,
    company: e.company,
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

  const paginationValues = [5, 10, 20, 30];
  const [option, setOption] = useState(paginationValues[0]);

  // -- Queries Supabase --//
  // Initialise supabase client
  const supabase = useSupabaseClient();

  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const [companiesQuery, companyCountQuery] = useQueries([
    {
      queryKey: [
        'get_active_ads',
        { from: selectedIndex * option, to: (selectedIndex + 1) * option - 1 },
      ],
      queryFn: async () =>
        supabase
          .rpc('get_active_ads')
          .range(selectedIndex * option, (selectedIndex + 1) * option - 1),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['get_ads_count'],
      queryFn: async () =>
        supabase.from('advertisements').select('*', { count: 'exact', head: true }),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);


  // -- Handler functions -- //
  /**
   * Handles for when a table item is selected/unselected
   * @param {{}} targetCompany The company that was selected/unselected
   * @param {boolean} isSelected Whether or not the company was selected/unselected
   */
  const onChangeHandler = (targetUser, selected) => {
    if (!selected && selectedCompanies.find((user) => user.id === targetUser.id)) {
      const result = [...selectedCompanies].filter((user) => user.id !== targetUser.id);
      setselectedCompanies(result);
    }

    if (selected && !selectedCompanies.find((user) => user.id === targetUser.id)) {
      const result = [...selectedCompanies];
      result.push(targetUser);
      setselectedCompanies(result);
    }
  };

  const adsCount = companyCountQuery.isLoading ? 0 : companyCountQuery.data.count;

  const renderTableButtons = () => {
    const tableButtons = [];
    if (adsCount.isLoading) {
      return (
        <TableButton
          index={0}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-success"
          className="rounded-lg hover:bg-success"
          disabled
        />
      );
    }
    const count = adsCount / option;
    for (let i = 0; i < count; i++) {
      tableButtons.push(
        <TableButton
          index={i}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-success"
          className={cx('hover:bg-success', {
            'rounded-l-lg': i === 0,
            'rounded-r-lg': i >= count - 1,
          })}
        />
      );
    }
    return tableButtons;
  };

  const checkInput = (type) => {
    if (type === 'Active') {
      return selectedCompanies.every(
        (e) =>
          e.active === 'Disabled' ||
          (!selectedCompanies.every((user) => user.active === 'Disabled') &&
            !selectedCompanies.every((user) => user.active === 'Active'))
      );
    }
    if (type === 'Disabled') {
      return selectedCompanies.every(
        (e) =>
          e.active === 'Active' ||
          (!selectedCompanies.every((user) => user.active === 'Disabled') &&
            !selectedCompanies.every((user) => user.active === 'Active'))
      );
    }
    return false;
  };
  const deactiveAds = async () => {
    const ids = [];
    selectedCompanies.map((e) => ids.push(e.id));
    await supabase.from('advertisements').update({ active: false }).in('id', ids);
    setselectedCompanies(selectedCompanies.map((e) => ({ ...e, active: 'Disabled' })));
    queryClient.invalidateQueries({ queryKey: 'activeAd' });
  };

  const activateAds = async () => {
    const ids = [];
    selectedCompanies.map((e) => ids.push(e.id));
    await supabase.from('advertisements').update({ active: true }).in('id', ids);
    setselectedCompanies(selectedCompanies.map((e) => ({ ...e, active: 'Active' })));
    queryClient.invalidateQueries({ queryKey: 'activeAd' });
  };

  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Registered Users</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * option + 1} to{' '}
              {(selectedIndex + 1) * option > adsCount ? adsCount : (selectedIndex + 1) * option} of{' '}
              {adsCount} entries
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select
              value={option}
              className="select select-bordered w-25"
              onChange={(e) => setOption(e.target.value)}
            >
              {paginationValues.map((value) => (
                <option value={value}>{value} per page</option>
              ))}
            </select>
            {/* <SearchBar placeholder="Search by name" /> */}
          </div>
        </div>
      }
      headings={['Advertisement', 'Company', 'Clicks', 'Email', 'Status']}
      headingColor="bg-primary"
      className={className}
      showCheckbox
      columnKeys={['advertisement', 'company', 'clicks', 'email', 'active']}
      centerColumns={['Clicks', 'Status']}
      data={companiesQuery.isLoading ? undefined : parseData(companiesQuery.data?.data)}
      onChange={onChangeHandler}
      advertisement
      footer={
        <div className="flex justify-between bg-none">
          <div className="flex gap-4">
            <button
              className="btn btn-primary text-white"
              onClick={deactiveAds}
              disabled={companiesQuery.isLoading || checkInput('Active')}
            >
              DISABLE
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={activateAds}
              disabled={companiesQuery.isLoading || checkInput('Disabled')}
            >
              ACTIVATE
            </button>
            <button
              className="btn btn-primary text-white"
              disabled={
                companiesQuery.isLoading ||
                selectedCompanies.length > 1 ||
                selectedCompanies.length === 0
              }
            >
              <Link
                href={`/ads/${
                  selectedCompanies.length === 0 ? undefined : selectedCompanies[0].id
                }`}
              >
                Edit
              </Link>
            </button>
          </div>
          <div className="flex justify-end bg-none">{renderTableButtons()}</div>
        </div>
      }
    />
  );
};

AdvertisementTable.propTypes = {
  className: PropTypes.string,
};

export default AdvertisementTable;
