import React from 'react';
import Image from 'next/image';
import { HiDotsVertical } from 'react-icons/hi';
import RegisteredUsersTable from '../../components/Tables/RegisteredUsersTable';
import RegisteredUsersTableWithoutCheckbox from '../../components/Tables/RegisteredUsersTableWithoutCheckbox';
import PendingInvitesTable from '../../components/Tables/PendingInvitesTable';
import RegisteredCompaniesTable from '../../components/Tables/RegisteredCompaniesTable';
import UserInvitesPreviewTable from '../../components/Tables/UserInvitesPreviewTable';

/**
 * @type {import("next").NextPage}
 */
/* problem: 
1. dots are going through the header 
2. known issue: doesn't focus properly on safari
3. haven't moved the edit delete logic over yet
4. functions innerImage and actionButton are still throwing errors
5. need to copy the new supabase data retrieval method from Karan's Registered Companies Table component
6. checkboxes are still throwing onChange errors
7. haven't copied over tick and cross checks for boolean values
*/
const Page = () => {
  // all data passed to react tables MUST be memoized
  // sample data declaration for playground
  const registeredUsersData = React.useMemo(
    () => [
      {
        id: 1,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'John Doe',
        email: 'john@doe.com',
        company: 'Company',
        mobileNumber: '+65 9832 0293',
        action: 'tempFuncPlaceholder',
      },
      {
        id: 2,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'Veryvery Long Name',
        email: 'veryverylongname@veryverylongdomain.com',
        company: 'Very Very Long Company Name',
        mobileNumber: '+65 9832 0293',
        action: 'tempFuncPlaceholder',
      },
      {
        id: 3,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'John Doe',
        email: 'john@doe.com',
        company: 'Company',
        mobileNumber: '+65 9832 0293',
        action: 'tempFuncPlaceholder',
      },
      {
        id: 4,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'John Doe',
        email: 'john@doe.com',
        company: 'Company',
        mobileNumber: '+65 9832 0293',
        action: 'tempFuncPlaceholder',
      },
      {
        id: 5,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'John Doe',
        email: 'john@doe.com',
        company: 'Company',
        mobileNumber: '+65 9832 0293',
        action: 'tempFuncPlaceholder',
      },
    ],
    []
  );
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
  // I give up, I can't refactor this out properly in time
  //   const actionButton = (props) => {
  //     <button
  //       type="button"
  //       className="flex items-center gap-2"
  //       onClick={() => {
  //         console.log('clicked value', props);
  //       }}
  //     >
  //       <HiDotsVertical />
  //     </button>;
  //   };

  // sample column declaration template
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

  const pendingInvitesData = React.useMemo(
    () => [
      {
        id: 1,
        company: 'Company',
        email: 'john@doe.com',
        mobileNumber: '+65 9832 0293',
      },
      {
        id: 2,
        company: 'Very Very Long Company Name',
        email: 'veryverylongname@veryverylongdomain.com',
        mobileNumber: '+65 9832 0293',
      },
    ],
    []
  );
  const pendingInvitesColumns = React.useMemo(
    () => [
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
    ],
    []
  );

  const registeredCompaniesData = React.useMemo(
    () => [
      {
        id: 1,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        company: 'Company',
        website: 'www.company.com',
        bio: 'Company Bio',
      },
      {
        id: 2,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        company: 'Very Very Long Company Name',
        website: 'veryverylongname@veryverylongdomain.com',
        bio: 'Very Very Long Company Bio',
      },
    ],
    []
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

  const userInvitesPreviewData = React.useMemo(
    () => [
      {
        id: 1,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'John Doe',
        email: 'hello@hello.com',
        company: 'Company',
        mobileNumber: '+65 9832 0293',
      },
      {
        id: 2,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'John Doe',
        email: 'hello@hello.com',
        company: 'Company',
        mobileNumber: '+65 9832 0293',
      },
    ],
    []
  );

  return (
    <div className="bg-[#FAFAFA] w-full">
      <div className="flex flex-row m-5">
        {/* Fixed Height ensures the table doesn't take up the entire page, and allows scrolling. For best results, this should be at least h-96. */}
        <RegisteredUsersTable
          data={registeredUsersData}
          columns={registeredUsersColumns}
          className="h-96"
        />
      </div>
      <div className="flex flex-row m-5">
        <RegisteredUsersTableWithoutCheckbox
          data={registeredUsersData}
          columns={registeredUsersColumns}
          className="h-96"
        />
      </div>
      {/* <div className="flex flex-row w-full">
        <div className="flex flex-row m-5">
          <PendingInvitesTable
            data={pendingInvitesData}
            columns={pendingInvitesColumns}
            className="h-96"
          />
        </div>
        <div className="flex flex-row m-5">
          <RegisteredCompaniesTable
            data={registeredCompaniesData}
            columns={registeredCompaniesColumns}
            className="h-96"
          />
        </div>
      </div>
      <div className="flex flex-row m-5">
        <UserInvitesPreviewTable
          data={userInvitesPreviewData}
          columns={registeredUsersColumns}
          className="h-96"
        />
      </div> */}
    </div>
  );
};

export default Page;
