import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Alert } from '@inc/ui';
import Link from 'next/link';
import { AiFillCloseCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const EditParam = ({ id }) => {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [paramT, setParamType] = useState('');
  const [dataT, setDataType] = useState('');
  const [tags, setTags] = useState([]);
  const [displayAlert, setDisplayAlert] = useState(null);
  const [error, setError] = useState(false);
  const supabase = useSupabaseClient();

  const { data: parameterType } = useQuery({
    queryKey: ['parameterType'],
    queryFn: async () => supabase.from('parameter_type').select(`id, name`),
  });

  const { data: dataType } = useQuery({
    queryKey: ['dataType'],
    queryFn: async () => supabase.from('datatype').select(`id, name`),
  });

  const { data: choices } = useQuery({
    queryKey: ['choices'],
    queryFn: async () =>
      supabase.from('parameter_choices').select(`choice`).eq('parameter', `${id}`),
    enabled: !!id,
  });

  const addTags = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }

    if (tags.length > 0) {
      setParamType('4');
    }
  };

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addChoiceParam = async (e) => {
    if (tags.length === 0) {
      setDisplayAlert(true);
      setError('choices');
      setTimeout(() => {
        setDisplayAlert(false);
        setError(false);
      }, 4000);
    } else {
      const { status } = await supabase
        .from('parameter')
        .update({
          name: `${name}`,
          display_name: `${displayName}`,
          type: `${paramT}`,
          datatype: `${dataT}`,
        })
        .eq('id', `${id}`);

      await supabase.from('parameter_choices').insert({ parameter: id, choice: tags });
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
    }
  };

  const changeUUID = (uuid) => {
    const parts = [];
    parts.push(uuid.slice(0, 8));
    parts.push(uuid.slice(8, 12));
    parts.push(uuid.slice(12, 16));
    parts.push(uuid.slice(16, 20));
    parts.push(uuid.slice(20, 32));
    return parts.join('-');
  };

  const { data } = useQuery({
    queryKey: ['parameterData', id],
    queryFn: async () =>
      supabase
        .from('parameter')
        .select(`name, display_name, parameter_type(id, name), datatype(id, name)`)
        .order('name', { ascending: true })
        .eq('id', `${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    setTags([]);
    setName(data?.data[0].name);
    setDisplayName(data?.data[0].display_name);
    setParamType(data?.data[0].parameter_type.id);
    setDataType(data?.data[0].datatype.id);
    if (choices?.data.length !== 0) {
      setTags(choices?.data[0].choice);
    }
  }, [data, choices]);

  const editParameter = async (e) => {
    e.preventDefault();

    if (tags.length === 0 && (paramT !== '3' || paramT !== '4')) {
      setDisplayAlert(true);
      setError('choices');
      setTimeout(() => {
        setDisplayAlert(false);
        setError(false);
      }, 4000);
    } else {
      const { status } = await supabase
        .from('parameter')
        .update({
          name: `${name}`,
          display_name: `${displayName}`,
          type: `${paramT}`,
          datatype: `${dataT}`,
        })
        .eq('id', `${id}`);

      if (choices?.data.length !== 0) {
        const { status: choiceStatus } = await supabase
          .from('parameter_choices')
          .update({
            choice: tags,
          })
          .eq('parameter', `${id}`);
      }

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
    }
  };

  return (
    <div>
      <div>
        <h3 className="text-lg font-bold">Edit Parameter</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            (e.target.paramType.value === '3' || e.target.paramType.value === '4') &&
            choices?.data.length === 0
          ) {
            addChoiceParam(e);
          } else {
            editParameter(e);
          }
        }}
      >
        <div className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Parameter Name</span>
          </div>
          <input
            name="parameterName"
            type="text"
            className="input-group input input-bordered"
            placeholder="Parameter Name"
            pattern="^[^\s].+[^\s]$"
            title="Category name should only include letters"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            required
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
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
                setParamType('4');
              } else {
                setParamType(e.target.value);
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
        {tags === undefined ? (
          <div />
        ) : (
          (paramT === '3' || paramT === '4' || paramT === 3 || paramT === 4) && (
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
          )
        )}
        <div className="modal-action">
          <div className="flex px-8 pb-8">
            <Link href="/parameters-management" className="btn btn-outline btn-warning">
              Return To Parameters
            </Link>
          </div>
          <button className="btn btn-outline btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
      {displayAlert && error === false && (
        <Alert
          level="success"
          message="Parameter successfully edited, please click back to return to category page"
          className="mt-4"
        />
      )}
      {displayAlert && error === 'choices' && (
        <Alert level="error" message="Duplicate parameter name found or No choices entered" className="mt-4" />
      )}
    </div>
  );
};

EditParam.propTypes = {
  id: PropTypes.string,
};
export default EditParam;
