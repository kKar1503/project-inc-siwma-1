import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { HiDotsVertical } from 'react-icons/hi';
import BaseTable from './BaseTable';
import SearchBar from '../SearchBar';
import TableButton from './TableButton';

// This table shows Registered Users and is built on the BaseTable component.

const UserInvitesPreviewTable = ({ data }) => {
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
  const registeredUsersColumns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'profilePicture',
        Cell: innerImage,
      },
      {
        Header: 'USER',
        accessor: 'name',
      },
      {
        Header: 'EMAIL',
        accessor: 'email',
      },
      {
        Header: 'COMPANY',
        accessor: 'company',
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
            <h1 className="font-bold text-xl">User Invites Preview</h1>
            <h1 className="pr-2">Processed {data.length} user invites from selected file</h1>
          </div>
          {/* <div className="flex flex-row gap-4">
            <h1 className="mt-3">Show</h1>
            <select className="select select-bordered w-25">
              <option>8 per page</option>
              <option>15 per page</option>
              <option>50 per page</option>
            </select>
          </div> */}
        </div>
      }
      searchPlaceholder="Search by e-mail"
      headings={['Company', 'E-mail', 'Mobile Number']}
      headingColor="bg-accent"
      showCheckbox
      columns={registeredUsersColumns}
      data={data}
      footer={
        <div className="flex justify-end bg-none">
          <div className="flex justify-end bg-none">
            <TableButton
              index={0}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-success"
              className="rounded-l-lg hover:bg-success"
            />
            <TableButton
              index={1}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-success"
              className="hover:bg-success"
            />
            <TableButton
              index={2}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedColor="bg-success"
              className="rounded-r-lg hover:bg-success"
            />
          </div>
        </div>
      }
    />
  );
};

UserInvitesPreviewTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      profilePicture: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      company: PropTypes.string,
      mobileNumber: PropTypes.string,
    })
  ),
};

export default UserInvitesPreviewTable;
