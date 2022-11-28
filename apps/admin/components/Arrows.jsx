import { useQueries, useQueryClient, useQuery } from 'react-query';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import supabase from '../supabaseClient';
import DataContext from '../DataContext';

const Arrows = ({ id }) => {
  const queryClient = useQueryClient();
  const { paramIds, setParamIds, options, setOptions } = useContext(DataContext);

  return (
    <div className="flex flex-col gap-5">
      <button
        className="btn btn-ghost bg-base-100 rounded-lg shadow-lg h-12 w-12 self-center items-center"
        disabled={paramIds === undefined || (paramIds !== undefined && paramIds.table === 'Active')}
        onClick={(e) => {
          makeActive(e);
        }}
      >
        <AiOutlineArrowLeft />
      </button>
      <button
        className="btn btn-ghost bg-base-100 rounded-lg shadow-lg h-12 w-12 self-center items-center"
        disabled={
          paramIds === undefined || (paramIds !== undefined && paramIds.table === 'Available')
        }
        onClick={(e) => {
          makeAvailable(e);
        }}
      >
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};

const propTypes = {
  id: PropTypes.string,
};

Arrows.propTypes = propTypes;

export default Arrows;
