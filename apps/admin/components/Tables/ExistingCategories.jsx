import React, { useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BaseTableCat } from './BaseTableCat';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

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
  const [selectedCategory, setSelectedCategories] = useState([]);
  const [option, setOption] = useState(paginationValues[0]);
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const [categoryQuery, categoryCountQuery] = useQueries([
    {
      queryKey: [
        'categories',
        { from: selectedIndex * option, to: (selectedIndex + 1) * option - 1 },
      ],
      queryFn: async () =>
        supabase
          .from('category')
          .select(`id, name, description, active`)
          .range(selectedIndex * option, (selectedIndex + 1) * option - 1)
          .order('name', { ascending: true }),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
    {
      queryKey: ['getCategoryCount'],
      queryFn: async () => supabase.from('category').select('*', { count: 'exact', head: true }),
      keepPreviousData: true,
      refetchInterval: 300000,
    },
  ]);

  const archiveCategory = async () => {
    const ids = [];
    selectedCategory.map((e) => ids.push(e.id));
    await supabase
      .from('category')
      .update({
        active: false,
      })
      .in('id', ids);
    setSelectedCategories(selectedCategory.map((e) => ({ ...e, active: 'Disabled' })));
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  const unarchiveCategory = async () => {
    const ids = [];
    selectedCategory.map((e) => ids.push(e.id));
    await supabase
      .from('category')
      .update({
        active: true,
      })
      .in('id', ids);
    setSelectedCategories(selectedCategory.map((e) => ({ ...e, active: 'Active' })));
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  const categoryCount =
    categoryCountQuery.isLoading || categoryCountQuery.data === undefined
      ? 0
      : categoryCountQuery.data.count;

  const renderTableButtons = () => {
    const tableButtons = [];
    if (categoryQuery.isLoading) {
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
    const count = categoryCount / option;
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

  const onChangeHandler = (targetUser, selected) => {
    if (!selected && selectedCategory.find((user) => user.id === targetUser.id)) {
      const result = [...selectedCategory].filter((user) => user.id !== targetUser.id);
      setSelectedCategories(result);
    }

    if (selected && !selectedCategory.find((user) => user.id === targetUser.id)) {
      const result = [...selectedCategory];
      result.push(targetUser);
      setSelectedCategories(result);
    }
    console.log(selectedCategory);
  };

  const checkInput = (type) => {
    if (type === 'Active') {
      return selectedCategory.every(
        (e) =>
          e.active === 'Disabled' ||
          (!selectedCategory.every((category) => category.active === 'Disabled') &&
            !selectedCategory.every((category) => category.active === 'Active'))
      );
    }
    if (type === 'Disabled') {
      return selectedCategory.every(
        (e) =>
          e.active === 'Active' ||
          (!selectedCategory.every((category) => category.active === 'Disabled') &&
            !selectedCategory.every((category) => category.active === 'Active'))
      );
    }
    return false;
  };

  return (
    <BaseTableCat
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Existing Categories</h1>
            <h1 className="pr-2">
              Showing {selectedIndex * option + 1} to{' '}
              {(selectedIndex + 1) * option > categoryCount
                ? categoryCount
                : (selectedIndex + 1) * option}{' '}
              of {categoryCount} entries
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select
              value={option}
              className="select select-bordered w-25"
              onChange={(e) => {
                setOption(e.target.value);
              }}
            >
              {paginationValues.map((value) => (
                <option value={value}>{value} per page</option>
              ))}
            </select>
            {/* <SearchBar placeholder="Search by name" /> */}
          </div>
        </div>
      }
      headings={['Category Name', 'Category Description', 'Status']}
      headingColor="bg-success"
      showCheckbox
      className={className}
      columnKeys={['name', 'description', 'active']}
      onChange={onChangeHandler}
      data={
        categoryQuery.isLoading || categoryQuery.data === undefined
          ? undefined
          : parseData(categoryQuery.data?.data)
      }
      footer={
        <div className="flex justify-between bg-none">
          <div className="flex gap-4">
            <button
              className="btn btn-primary text-white"
              onClick={archiveCategory}
              disabled={categoryQuery.isLoading || checkInput('Active')}
            >
              DEACTIVATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={unarchiveCategory}
              disabled={categoryQuery.isLoading || checkInput('Disabled')}
            >
              ACTIVATE SELECTED
            </button>
            <button
              className="btn btn-primary text-white"
              disabled={
                categoryQuery.isLoading ||
                selectedCategory.length > 1 ||
                selectedCategory.length === 0
              }
            >
              <Link
                href={`/category/${
                  selectedCategory.length === 0 ? undefined : selectedCategory[0].id
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

ExistingCategories.propTypes = {
  className: PropTypes.string,
};

export default ExistingCategories;
