/* eslint-disable no-alert */
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';
import * as XLSX from 'xlsx';

const FileUpload = ({ className, setUserTableData, setCompanyTableData, setError }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = async (event) => {
    if (event.target.files[0].size > 64000000) {
      // 64000000 bytes = 64 MB
      // TODO: Replace with custom alert component
      alert('File is too big!');
      setError(true);
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

      let wb = {}; // Declare an empty object to avoid nesting within the try block
      try {
        wb = XLSX.read(bstr, { type: 'binary' });
      } catch (e) {
        alert('File is corrupt!');
        setSelectedFile(null);
        setError(true);
        return;
      }

      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Parse data into objects
      let userData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // Remove header row
      userData.shift();

      // Create userData and companyData arrays
      let companyData = [];

      // Identify duplicate emails and mobile numbers
      const duplicateEmails = new Set();
      const duplicateMobileNumbers = new Set();

      for (let i = 0; i < userData.length; i++) {
        const row = userData[i];
        // Check if company already exists in companyData
        const index = companyData.findIndex((company) => company[0] === row[0]);

        if (index === -1) {
          // Company does not exist, add it to companyData
          companyData.push([row[0], row[3]]);
        } else if (companyData[index][1] === '') {
          // Company exists but does not have an email, fill in the missing info
          companyData[index] = {
            name: companyData[index][0],
            email: row[3],
          };
        }

        // Check if user is missing information. row[3] is the company email, which is optional
        if (
          row[0] === undefined ||
          row[0].trim() === '' ||
          row[1] === undefined ||
          row[1].trim() === '' ||
          row[2] === undefined ||
          row[2].trim() === '' ||
          row[4] === undefined ||
          row[4].trim() === ''
        ) {
          // TODO: Replace with custom alert component
          alert(`User is missing information.`);
          setSelectedFile(null);
          setError(true);
          return;
        }

        const email = row[1];
        const mobileNumber = row[2];
        if (duplicateEmails.has(email)) {
          // TODO: Replace with custom alert component
          alert(`Duplicate email found: ${email}`);
          setSelectedFile(null);
          setError(true);
        } else {
          duplicateEmails.add(email);
        }
        if (duplicateMobileNumbers.has(mobileNumber)) {
          // TODO: Replace with custom alert component
          alert(`Duplicate mobile number found: ${mobileNumber}`);
          setSelectedFile(null);
          setError(true);
        } else {
          duplicateMobileNumbers.add(mobileNumber);
        }
      }

      // Add ids and convert to objects
      companyData = companyData.map((company, index) => ({
        id: index,
        name: company[0],
        website: company[1],
      }));
      userData = userData.map((user, index) => ({
        id: index,
        name: user[4],
        company: user[0],
        email: user[1],
        mobileNumber: user[2],
      }));

      setCompanyTableData(companyData);
      setUserTableData(userData);
      setError(false); // Reset error state in case there was an error previously
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
  setError: PropTypes.func,
};

export default FileUpload;
