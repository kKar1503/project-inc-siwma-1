import React from 'react';
import Image from 'next/image';
import RegisteredUsersTable from '../../components/Tables/RegisteredUsersTable';
import RegisteredUsersTableWithoutCheckbox from '../../components/Tables/RegisteredUsersTableWithoutCheckbox';
import PendingInvitesTable from '../../components/Tables/PendingInvitesTable';
import RegisteredCompaniesTable from '../../components/Tables/RegisteredCompaniesTable';
import UserInvitesPreviewTable from '../../components/Tables/UserInvitesPreviewTable';

/**
 * @type {import("next").NextPage}
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
      },
      {
        id: 2,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'Veryvery Long Name',
        email: 'veryverylongname@veryverylongdomain.com',
        company: 'Very Very Long Company Name',
        mobileNumber: '+65 9832 0293',
      },
      {
        id: 3,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'John Doe',
        email: 'john@doe.com',
        company: 'Company',
        mobileNumber: '+65 9832 0293',
      },
      {
        id: 4,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'John Doe',
        email: 'john@doe.com',
        company: 'Company',
        mobileNumber: '+65 9832 0293',
      },
      {
        id: 5,
        profilePicture:
          'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg',
        name: 'John Doe',
        email: 'john@doe.com',
        company: 'Company',
        mobileNumber: '+65 9832 0293',
      },
    ],
    []
  );
  const innerimage = (props) => (
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

  // sample column declaration template
  const registeredUsersColumns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'profilePicture',
        Cell: (props) => innerimage(props),
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
    ],
    []
  );
  //   const subColumns = registeredUsersColumns.slice(0);
  //   subColumns.push({
  //     id: 'button',
  //     accessor: 'firstName',
  //     Cell: ({ value }) => (
  //       <a
  //         onClick={() => {
  //           console.log('clicked value', value);
  //         }}
  //       >
  //         Button
  //       </a>
  //     ),
  //   });

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
        Cell: (props) => innerimage(props),
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
      <div className="flex flex-row w-full">
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
      </div>
    </div>
  );
};

export default Page;
