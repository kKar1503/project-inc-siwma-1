import { useQueries, useQueryClient, useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';
import supabase from '../supabaseClient';

const CreateParam = () => {
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

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const addTags = (e) => {
    if (e.target.value !== '') {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
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
          if (
            e.target.paramType.value !== 'TWO CHOICES' &&
            e.target.paramType.value !== 'MANY CHOICES'
          ) {
            console.log(e.target.paramName.value);
            console.log(e.target.paramType.value);
            console.log(e.target.dataType.value);
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
            placeholder="Category Name"
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
          >
            {parameterType?.data.map((e) => (
              <option>{e.name}</option>
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
              <option>{e.name}</option>
            ))}
          </select>
        </div>
        {(paramT === 'TWO CHOICES' || paramT === 'MANY CHOICES') && (
          <div className="form-control">
            <p>{tags}</p>
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
                <li key={tag} className="btn btn-primary">
                  <span className="mr-2">{tag}</span>
                  <button onClick={() => removeTags(index)}>
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
