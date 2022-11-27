import { useQueries, useQueryClient } from 'react-query';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import PropTypes from 'prop-types';
import supabase from '../supabaseClient';

const Arrows = () => {
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-5">
      <div className="btn btn-ghost bg-base-100 rounded-lg shadow-lg h-12 w-12 self-center items-center">
        <AiOutlineArrowLeft />
      </div>
      <div className="btn btn-ghost bg-base-100 rounded-lg shadow-lg h-12 w-12 self-center items-center">
        <AiOutlineArrowRight />
      </div>
    </div>
  );
};

export default Arrows;
