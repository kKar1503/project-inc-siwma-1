import { useQueries, useQueryClient, useQuery } from 'react-query';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Alert } from '@inc/ui';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const CreateParam = () => {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const [paramT, setParamtype] = useState('');
  const [dataT, setDataType] = useState('');
  const [tags, setTags] = useState([]);
  const [displayAlert, setDisplayAlert] = useState(null);
  const [error, setError] = useState(false);

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
    if (tags.length > 0) {
      setParamtype('4');
    }
  };

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addChoiceParam = async (e) => {
    // const tagsObj = [];
    if (tags.length === 0) {
      setDisplayAlert(true);
      setError('choices');
      setTimeout(() => {
        setDisplayAlert(false);
        setError(false);
      }, 4000);
    } else {
      const { data, status } = await supabase
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
    }
  };

  const addParam = async (e) => {
    e.preventDefault();

    const { data, status } = await supabase.from('parameter').insert({
      name: e.target.paramName.value,
      display_name: e.target.displayName.value,
      type: e.target.paramType.value,
      datatype: e.target.dataType.value,
    });

    if (status === 409) {
      setDisplayAlert(true);
      setError(true);
      setTimeout(() => {
        setDisplayAlert(false);
        setError(false);
      }, 4000);
    } else {
      setDisplayAlert(true);

      setTimeout(() => {
        setDisplayAlert(false);
      }, 4000);
    }

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
            pattern="^[^\s].+[^\s]$"
            title="Parameter name should not have spaces at the start or end"
            required
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
            pattern="^[^\s].+[^\s]$"
            title="Display name should not have spaces at the start or end"
            required
          />
        </div>
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Parameter Type</span>
          </div>
          <select
            className="select select-bordered font-normal text-gray-400"
            name="paramType"
            required
            onChange={(e) => {
              if (e.target.value === '3' && tags.length > 2 && tags.length !== 0) {
                setParamtype('4');
              } else {
                setParamtype(e.target.value);
              }
            }}
            value={paramT}
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
            required
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
                    type="button"
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
      {displayAlert && error && (
        <Alert level="error" message="Duplicate parameter name found" className="mt-4" />
      )}
      {displayAlert && error === false && (
        <Alert level="success" message="Parameter successfully created" className="mt-4" />
      )}
      {displayAlert && error === 'choices' && (
        <Alert level="error" message="No choices entered" className="mt-4" />
      )}
    </div>
  );
};

export default CreateParam;
