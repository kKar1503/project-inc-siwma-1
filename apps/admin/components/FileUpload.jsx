import cx from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';
import * as XLSX from 'xlsx';

const FileUpload = ({ className, setUserTableData, setCompanyTableData }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = async (event) => {
    if (event.target.files[0].size > 64000000) {
      // 64000000 bytes = 64 MB
      alert('File is too big!');
      return;
    }

    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (evt) => {
      /*
      XLSX Workbooks are essentially just a zip containing XMLs called Worksheets.
      As we are only interested in the first Worksheet, we can just grab it directly and it is guaranteed to exist unless the XLSX itself is corrupt.
       */

      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Parse data into objects
      let userData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // Remove header row
      userData.shift();

      let companyData = [];
      userData.forEach((element) => {
        // Check if company already exists in companyData
        const index = companyData.findIndex((company) => company[0] === element[0]);

        if (index === -1) {
          // Company does not exist, add it to companyData
          companyData.push([element[0], element[3]]);
        } else if (companyData[index][1] === '') {
          // Company exists but does not have an email, fill in the missing info
          companyData[index] = {
            name: companyData[index][0],
            email: element[3],
          };
        }
      });

      // Remove incomplete rows
      userData = userData.filter(
        (element) =>
          element[0] !== '' && element[1] !== '' && element[2] !== '' && element[3] !== ''
      );

      // Identify duplicate emails and mobile numbers
      const duplicateEmails = [];
      const duplicateMobileNumbers = [];
      userData.forEach((element) => {
        const email = element[1];
        const mobileNumber = element[2];
        if (duplicateEmails.includes(email)) {
          // TODO: Replace with custom alert component
          alert(`Duplicate email found: ${email}`);
        } else {
          duplicateEmails.push(email);
        }
        if (duplicateMobileNumbers.includes(mobileNumber)) {
          // TODO: Replace with custom alert component
          alert(`Duplicate mobile number found: ${mobileNumber}`);
        } else {
          duplicateMobileNumbers.push(mobileNumber);
        }
      });

      // Add ids and convert to objects
      companyData = companyData.map((company, index) => ({
        id: index,
        name: company[0],
        website: company[1],
      }));
      userData = userData.map((user, index) => ({
        id: index,
        company: user[0],
        email: user[1],
        mobileNumber: user[2],
      }));

      setCompanyTableData(companyData);
      setUserTableData(userData);
    };
    reader.readAsBinaryString(event.target.files[0]);
  };

  return (
    <div className={cx(className, 'flex flex-col bg-base-100 rounded-lg shadow-lg')}>
      <div className="p-6">
        <h2 className="text-lg font-bold">Bulk Add Companies & Invite Users</h2>
        <p>Import an .xlsx file below to bulk add company profiles and bulk invite users</p>
      </div>
      <hr />
      <div className="flex-1 p-6">
        <div className="flex flex-col justify-center items-center border border-primary-content border-dotted h-full p-10 gap-5">
          <div className="h-20">
            <input
              id="fileInput"
              type="file"
              onChange={changeHandler}
              className="hidden"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // Accept only .xlsx files
            />
            <label htmlFor="fileInput">
              {selectedFile == null ? (
                <FiUpload className="w-full h-full" />
              ) : (
                <BsFileEarmarkSpreadsheet className="w-full h-full text-success" />
              )}
            </label>
          </div>
          {selectedFile != null ? (
            <p className="text-center">{selectedFile.name}</p>
          ) : (
            <p className="text-lg text-center w-3/4">
              Click to upload or drag and drop .xslx (MAX. 64MB)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  className: PropTypes.string,
  setUserTableData: PropTypes.func,
  setCompanyTableData: PropTypes.func,
};

export default FileUpload;
