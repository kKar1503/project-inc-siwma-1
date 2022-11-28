import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiDotsVertical } from 'react-icons/hi';
import Image from 'next/image';
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
    profilePicture:
      'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
    company: e.name,
    website: e.website,
    bio: e.bio,
    visible: e.visible === 1,
  }));
}

// This table shows a preview of Company Profiles and is built on the BaseTable component.

const CompanyProfilesPreviewTable = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
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
  const CompanyProfilesColumns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'profilePicture',
        Cell: innerImage,
      },
      {
        Header: 'COMPANY',
        accessor: 'company',
      },
      {
        Header: 'EMAIL',
        accessor: 'email',
      },
      {
        Header: 'MOBILE NUMBER',
        accessor: 'mobileNumber',
      },
      {
        Header: 'ACTIONS',
        accessor: 'action',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: (props) => (
          <div className="flex items-center gap-2 dropdown dropdown-bottom dropdown-end">
            <button htmlFor="actionDropdown">
              <div>
                <HiDotsVertical />
              </div>
            </button>
            <ul
              id="actionDropdown"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button>Edit</button>
              </li>
              <li>
                <button>View More</button>
              </li>
            </ul>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <BaseTable
      header={
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col pb-3">
            <h1 className="font-bold text-xl">Company Profiles Preview</h1>
            <h1 className="pr-2">Processed {data.length} company profiles from selected file</h1>
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select className="select select-bordered w-25">
              <option>8 per page</option>
              <option>15 per page</option>
              <option>50 per page</option>
            </select>
            <SearchBar placeholder="Search by name" />
          </div>
        </div>
      }
      headings={['Company', 'Website']}
      headingColor="bg-primary"
      showCheckbox
      columns={CompanyProfilesColumns}
      data={data}
      footer={
        <div className="flex justify-end bg-none">
          <div className="flex justify-end bg-none">
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

CompanyProfilesPreviewTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      website: PropTypes.string,
    })
  ),
};

export default CompanyProfilesPreviewTable;
