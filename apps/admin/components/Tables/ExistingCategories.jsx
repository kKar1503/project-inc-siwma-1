import { useQuery } from 'react-query';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import BaseTableCat from './BaseTableCat';
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const supabase = useSupabaseClient();

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      supabase
        .from('category')
        .select(`id, name, description, active`)
        .order('name', { ascending: true }),
  });

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
            <h1 className="font-bold text-xl">Existing Categories</h1>
            <h1>Showing 1 to 10 of X entries</h1>
          </div>
          <div className="flex flex-row gap-4">
            <SearchBar placeholder="Search..." />
          </div>
        </div>
      }
      headings={['Category Name', 'Category Description', 'Status']}
      headingColor="bg-warning"
      showCheckbox
      className={className}
      columnKeys={['name', 'description', 'active']}
      data={isLoading ? undefined : parseData(data?.data)}
      footer={
        <div className="flex justify-between bg-none">
          <div className="flex justify-end bg-none">
            <TableButton
              index={0}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-warning"
              styles="rounded-l-lg"
            />
            <TableButton
              index={1}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-warning"
            />
            <TableButton
              index={2}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-warning"
              styles="rounded-r-lg"
            />
          </div>
        </div>
      }
    />
  );
};

ExistingCategories.propTypes = {
  className: PropTypes.string,
};

export default ExistingCategories;