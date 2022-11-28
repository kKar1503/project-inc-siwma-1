import { useQueries, useQueryClient, useQuery } from 'react-query';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import PropTypes from 'prop-types';
import supabase from '../supabaseClient';

const Arrows = ({ id, optionData, paramId }) => {
  const queryClient = useQueryClient();

  // Can use next time?
  // const useMakeAvailable = async (e) => {
  //   e.preventDefault();
  //   const options = [];
  //   optionData.options.map((item) => options.push(item));
  //   options.toString();
  //   return useMutation(
  //     () =>
  //       supabase
  //         .from('categories_parameters')
  //         .delete()
  //         .eq('category', id)
  //         .filter('parameter', 'in', `(${options})`),
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries({ queryKey: ['activeParameters', 'availableParameters'] });
  //       },
  //     }
  //   );
  // };

  const makeAvailable = async (e) => {
    const options = [];
    optionData.options.map((item) => options.push(item));
    options.toString();
    await supabase
      .from('categories_parameters')
      .delete()
      .eq('category', id)
      .filter('parameter', 'in', `(${options})`);
    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['categoryParameters'] });
    paramId(undefined);
  };

  const makeActive = async (e) => {
    const options = [];
    optionData.options.map((item) => options.push({ category: id, parameter: item }));
    await supabase.from('categories_parameters').insert(options);

    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['categoryParameters'] });
    paramId(undefined);
  };

  return (
    <div className="flex flex-col gap-5">
      <button
        className="btn btn-ghost bg-base-100 rounded-lg shadow-lg h-12 w-12 self-center items-center"
        disabled={
          optionData === undefined || (optionData !== undefined && optionData.table === 'Active')
        }
        onClick={(e) => {
          makeActive(e);
        }}
      >
        <AiOutlineArrowLeft />
      </button>
      <button
        className="btn btn-ghost bg-base-100 rounded-lg shadow-lg h-12 w-12 self-center items-center"
        disabled={
          optionData === undefined || (optionData !== undefined && optionData.table === 'Available')
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
  optionData: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.number),
    table: PropTypes.string,
  }),
  paramId: PropTypes.func,
};

Arrows.propTypes = propTypes;

export default Arrows;
