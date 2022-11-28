import { useQueries, useQueryClient } from 'react-query';
import Link from 'next/link';
import { BsThreeDotsVertical, BsFillPencilFill } from 'react-icons/bs';
import { RiInboxArchiveFill, RiInboxUnarchiveFill } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const ActionParam = ({ data, row }) => {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const archiveParam = async (e) => {
    e.preventDefault();
    await supabase
      .from('parameter')
      .update({
        active: false,
      })
      .eq('id', data[row].id);
    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['availableParameters'] });
  };

  const unarchiveParam = async (e) => {
    e.preventDefault();
    await supabase
      .from('parameter')
      .update({
        active: true,
      })
      .eq('id', data[row].id);
    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['availableParameters'] });
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
            Edit
          </div>
        </li>
        <li>
          <button
            className="btn btn-ghost w-30"
            onClick={async (e) => {
              await archiveParam(e);
            }}
            tabIndex={0}
            disabled={data[row].active === 'Disabled'}
          >
            <RiInboxArchiveFill />
            Archive
          </button>
        </li>
        <li>
          <button
            className="btn btn-ghost w-30"
            onClick={async (e) => {
              await unarchiveParam(e);
            }}
            tabIndex={0}
            disabled={data[row].active === 'Active'}
          >
            <RiInboxUnarchiveFill />
            UnArchive
          </button>
        </li>
      </div>
    </div>
  );
};

const propTypes = {
  row: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // We don't know what the data object will look like, so we can't specify it.
};

ActionParam.propTypes = propTypes;
export default ActionParam;
