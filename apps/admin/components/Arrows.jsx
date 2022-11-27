import { useQueries, useQueryClient } from 'react-query';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import PropTypes from 'prop-types';
import supabase from '../supabaseClient';

const Arrows = ({ id, optionData }) => {
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-5">
      <button
        className="btn btn-ghost bg-base-100 rounded-lg shadow-lg h-12 w-12 self-center items-center"
        disabled={
          optionData === undefined || (optionData !== undefined && optionData.table === 'Active')
        }
      >
        <AiOutlineArrowLeft />
      </button>
      <button
        className="btn btn-ghost bg-base-100 rounded-lg shadow-lg h-12 w-12 self-center items-center"
        disabled={
          optionData === undefined || (optionData !== undefined && optionData.table === 'Available')
        }
      >
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};

const propTypes = {
  id: PropTypes.string,
  optionData: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.number),
    table: PropTypes.string,
  }),
};

Arrows.propTypes = propTypes;

export default Arrows;
