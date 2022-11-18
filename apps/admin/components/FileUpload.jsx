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
      As we are only interested in the first sheet, we can just grab it directly and it is guaranteed to exist unless the XLSX itself is corrupt.
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
        companyData.push(element[0]);
      });

      // Remove duplicate company names from companyData
      companyData = [...new Set(companyData)];

      // Remove incomplete rows
      userData = userData.filter((element) => element[0] !== '');

      // Add ids
      userData = userData.map((user, index) => ({
        id: index,
        company: user[0],
        email: user[1],
        mobileNumber: user[2],
      }));

      companyData = companyData.map((company, index) => ({ id: index, name: company }));
      console.log(companyData);

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
