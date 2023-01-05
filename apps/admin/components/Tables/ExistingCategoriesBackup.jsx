import cx from 'classnames';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import BaseTableCat from './BaseTableCat/BaseTableCatBackup';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows Categories and is built on the BaseTable component.

const parseData = (data) =>
  data.map((e) => ({
    id: e.id,
    name: e.name,
    description: e.description,
    active: e.active ? `Active` : `Disabled`,
  }));

const ExistingCategories = ({ className }) => {
  const paginationValues = [5, 10, 20, 30];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedInvites, setSelectedInvites] = useState([]);
  const [option, setOption] = useState(paginationValues[0]);

  const supabase = useSupabaseClient();

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      supabase
        .from('category')
        .select(`id, name, description, active`)
        .order('name', { ascending: true }),
  });

  const categoryLength = isLoading ? undefined : data?.data.length;

  const renderTableButtons = () => {
    const tableButtons = [];
    if (isLoading) {
      return (
        <TableButton
          index={0}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-warning"
          className="rounded-lg hover:bg-warning"
          disabled
        />
      );
    }
    const count = categoryLength / option;
    for (let i = 0; i < count; i++) {
      tableButtons.push(
        <TableButton
          index={i}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedColor="bg-warning"
          className={cx('hover:bg-warning', {
            'rounded-l-lg': i === 0,
            'rounded-r-lg': i >= count - 1,
          })}
        />
      );
    }
    return tableButtons;
  };
  // Can use next time?
  // const useCategories = () => {
  //   useQuery({
  //     queryKey: ['categories'],
  //     queryFn: async () =>
  //       supabase
  //         .from('category')
  //         .select(`id, name, description, active`)
  //         .order('name', { ascending: true }),
  //   });
  // };

  // const { data, isLoading } = useCategories();

  return (
    <BaseTableCat
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Exising Categories</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * option + 1} to{' '}
              {(selectedIndex + 1) * option > categoryLength
                ? categoryLength
                : (selectedIndex + 1) * option}{' '}
              of {categoryLength} entries
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
            <SearchBar placeholder="Search..." />
          </div>
        </div>
      }
      headings={['Category Name', 'Category Description', 'Status']}
      headingColor="bg-warning"
      showCheckbox={false}
      className={className}
      columnKeys={['name', 'description', 'active']}
      data={isLoading ? undefined : parseData(data?.data)}
      footer={<div className="flex justify-end bg-none">{renderTableButtons()}</div>}
    />
  );
};

ExistingCategories.propTypes = {
  className: PropTypes.string,
};

export default ExistingCategories;
