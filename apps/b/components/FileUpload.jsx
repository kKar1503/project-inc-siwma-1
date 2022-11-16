import cx from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';
import * as XLSX from 'xlsx';

const FileUpload = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log('data');
    };
    reader.readAsBinaryString(event.target.files[0]);
  };

  return (
    <div className={cx(className, 'flex flex-col bg-base-100 rounded-lg shadow-lg')}>
      <div className="p-6">
        <h2 className="text-lg font-bold">Bulk Add Companies & Invite Users</h2>
        <p>Import a .xlsx file below to bulk add company profiles and bulk invite users</p>
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
              Click to upload or drag and drop .xslx or .csv (MAX. 64MB)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  className: PropTypes.string,
};

export default FileUpload;
