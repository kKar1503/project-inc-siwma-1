import { useQueries, useQueryClient, useQuery } from 'react-query';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import supabase from '../supabaseClient';
import DataContext from '../DataContext';

const Arrows = ({ id }) => {
  const queryClient = useQueryClient();
  const { paramIds, setParamIds, options, setOptions } = useContext(DataContext);
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
    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['categoryParameters'] });
    setParamIds(undefined);
    setOptions([]);
  };

  const makeActive = async (e) => {
    const option = [];
    paramIds.options.map((item) => option.push({ category: id, parameter: item }));
    await supabase.from('categories_parameters').insert(option);

    queryClient.invalidateQueries({ queryKey: ['activeParameters'] });
    queryClient.invalidateQueries({ queryKey: ['categoryParameters'] });
    setParamIds(undefined);
    setOptions([]);
  };

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
