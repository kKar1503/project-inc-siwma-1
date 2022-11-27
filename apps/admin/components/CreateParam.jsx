import { useQueries, useQueryClient, useQuery } from 'react-query';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import supabase from '../supabaseClient';

const CreateParam = () => {
  const queryClient = useQueryClient();

  const [paramT, setParamtype] = useState('');
  const [dataT, setDataType] = useState('');
  const [tags, setTags] = useState([]);

  const { data: parameterType } = useQuery({
    queryKey: ['parameterType'],
    queryFn: async () => supabase.from('parameter_type').select(`id, name`),
  });

  const { data: dataType } = useQuery({
    queryKey: ['dataType'],
    queryFn: async () => supabase.from('datatype').select(`id, name`),
  });

  const addTags = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const formatData = () => {};

  const addChoiceParam = async (e) => {
    const tagsObj = [];

    const { data, error } = await supabase
      .from('parameter')
      .insert({
        name: e.target.paramName.value,
        display_name: e.target.displayName.value,
        type: e.target.paramType.value,
        datatype: e.target.dataType.value,
      })
      .select('id');

    // tags.map((tag) => tagsObj.push({ parameter: data[0].id, choice: tag }));
    // console.log(tagsObj);

    await supabase.from('parameter_choices').insert({ parameter: data[0].id, choice: tags });
    queryClient.invalidateQueries({ queryKey: ['availableParameters'] });
  };

  const addParam = async (e) => {
    await supabase.from('parameter').insert({
      name: e.target.paramName.value,
      display_name: e.target.displayName.value,
      type: e.target.paramType.value,
      datatype: e.target.dataType.value,
    });

    queryClient.invalidateQueries({ queryKey: ['availableParameters'] });
  };

  return (
    <div>
      <div>
        <h3 className="text-lg font-bold">Create Parameter</h3>
        <p className="text-sm">Create New Parameter</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (e.target.paramType.value === '3' || e.target.paramType.value === '4') {
            addChoiceParam(e);
          } else {
            addParam(e);
          }
        }}
      >
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Parameter Name</span>
          </div>
          <input
            name="paramName"
            type="text"
            className="input-group input input-bordered"
            placeholder="Parameter Name"
          />
        </div>
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Display Name</span>
          </div>
          <input
            name="displayName"
            type="text"
            className="input-group input input-bordered"
            placeholder="Display Name"
          />
        </div>
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Parameter Type</span>
          </div>
          <select
            className="select select-bordered font-normal text-gray-400"
            name="paramType"
            onChange={(e) => {
              setParamtype(e.target.value);
            }}
            value={tags.length > 2 && tags.length !== 0 ? '4' : paramT}
          >
            {parameterType?.data.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Data Type</span>
          </div>
          <select
            className="select select-bordered font-normal text-gray-400"
            name="dataType"
            onChange={(e) => {
              setDataType(e.target.value);
            }}
          >
            {dataType?.data.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        {(paramT === '3' || paramT === '4') && (
          <div className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Choices</span>
            </div>
            <input
              name="choices"
              type="text"
              className="input-group input input-bordered"
              placeholder="Choice Options"
              onKeyDown={(e) => (e.key === 'Enter' ? addTags(e) : null)}
            />
            <ul className="flex gap-3 flex-wrap pt-2">
              {tags.map((tag, index) => (
                <li className="btn btn-primary">
                  <button
                    onClick={(e) => {
                      removeTags(index);
                    }}
                    className="flex"
                  >
                    <span className="mr-2">{tag}</span>
                    <AiFillCloseCircle />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="modal-action">
          <button
            htmlFor="user-invite"
            className="btn btn-outline btn-primary w-full"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateParam;
