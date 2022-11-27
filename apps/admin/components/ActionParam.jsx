import { useQueries, useQueryClient } from 'react-query';
import Link from 'next/link';
import { BsThreeDotsVertical, BsFillPencilFill } from 'react-icons/bs';
import { RiInboxArchiveFill, RiInboxUnarchiveFill } from 'react-icons/ri';
import PropTypes from 'prop-types';
import supabase from '../supabaseClient';

const ActionParam = ({ data, row, catId }) => {
  const queryClient = useQueryClient();

  const archiveCategory = async (e) => {
    e.preventDefault();
    await supabase
      .from('category')
      .update({
        active: false,
      })
      .eq('id', data[row].id);
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  const unarchiveCategory = async (e) => {
    e.preventDefault();
    await supabase
      .from('category')
      .update({
        active: true,
      })
      .eq('id', data[row].id);
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  return (
    <div
      className={
        data.length - 1 === row ? 'dropdown dropdown-left dropdown-end' : 'dropdown dropdown-left '
      }
    >
      <button className="btn btn-ghost">
        <BsThreeDotsVertical />
      </button>
      <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
        <li>
          <div className="btn btn-ghost w-30">
            <BsFillPencilFill />
            <Link href={`/category/${catId}`}>Edit</Link>
          </div>
        </li>
        <li>
          <div
            className="btn btn-ghost w-30"
            onClick={async (e) => {
              await archiveCategory(e);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={async (e) => {
              await archiveCategory(e);
            }}
            disabled={data[row].active === 'Disabled'}
          >
            <RiInboxArchiveFill />
            Archive
          </div>
        </li>
        <li>
          <div
            className="btn btn-ghost w-30"
            onClick={async (e) => {
              await unarchiveCategory(e);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={async (e) => {
              await unarchiveCategory(e);
            }}
            disabled={data[row].active === 'Active'}
          >
            <RiInboxUnarchiveFill />
            UnArchive
          </div>
        </li>
      </div>
    </div>
  );
};

const propTypes = {
  catId: PropTypes.string,
  row: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
};

ActionParam.propTypes = propTypes;
export default ActionParam;
