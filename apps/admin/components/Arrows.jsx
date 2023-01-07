import { useQueries, useQueryClient, useQuery } from 'react-query';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import DataContext from '../DataContext';

const Arrows = ({ id }) => {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();
  const {
    paramIds,
    setParamIds,
    setOptions,
    setSelectedAvailParam,
    setSelectedActiveParam,
    selectedAvailParam,
  } = useContext(DataContext);

  if (selectedAvailParam !== undefined) {
    console.log(selectedAvailParam);
  }

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
    const option = [];
    paramIds.options.map((item) => option.push(item));
    option.toString();
    await supabase
      .from('categories_parameters')
      .delete()
      .eq('category', id)
      .filter('parameter', 'in', `(${option})`);
    queryClient.invalidateQueries({ queryKey: ['categoryParameters'] });
    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['availableParameters'] });
    queryClient.invalidateQueries({ queryKey: ['getActiveParamCount'] });
    queryClient.invalidateQueries({ queryKey: ['getAvaliableParamCount'] });
    setParamIds(undefined);
    setOptions([]);
    setSelectedActiveParam([]);
  };

  const makeActive = async (e) => {
    const option = [];
    paramIds.options.map((item) => option.push({ category: id, parameter: item }));
    await supabase.from('categories_parameters').insert(option);
    queryClient.invalidateQueries({ queryKey: ['categoryParameters'] });
    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['availableParameters'] });
    queryClient.invalidateQueries({ queryKey: ['getActiveParamCount'] });
    queryClient.invalidateQueries({ queryKey: ['getAvaliableParamCount'] });
    setParamIds(undefined);
    setOptions([]);
    setSelectedAvailParam([]);
  };

  const checkparam = () => {
    if (selectedAvailParam.length !== 0) {
      if (selectedAvailParam[0].active === 'Disabled') {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex flex-col gap-5">
      <button
        className="btn btn-ghost bg-base-100 rounded-lg shadow-lg h-12 w-12 self-center items-center"
        disabled={
          paramIds === undefined ||
          (paramIds !== undefined && paramIds.table === 'Active') ||
          checkparam()
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
          paramIds === undefined ||
          (paramIds !== undefined && paramIds.table === 'Available') ||
          checkparam()
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
