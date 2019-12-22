import React, { useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import throttle from '../../utils/throttle';
import API from '../../api/api';
import { IUser, IChat } from '../../redux/types';


interface IProps {
  classNamePrefix: string,
  setSearchState: (arr: IUser[] | IChat[]) => void,
  setQuery: (query: string) => void,
  query: string,
}

const Searcher = ({classNamePrefix, setSearchState, setQuery, query}: IProps) => {

  const throttledGetParticipantsByQuery = useCallback(
    throttle((query) => API.getParticipantsByQuery(query)
      .then((res) => setSearchState(res.data))
      .catch(console.error)
      , 400),
  []);
  
  useEffect(() => {
    if (query.length > 1) {
      throttledGetParticipantsByQuery(query);
    }
  }, [query, query.length, throttledGetParticipantsByQuery])

  return (
    <div className={`${classNamePrefix}__searcher-wrap`} >
      <input 
        type="text" 
        className={`${classNamePrefix}__input`}
        onChange={(e) => setQuery(e.target.value)}
      />

      <FontAwesomeIcon className={`${classNamePrefix}__icon`} icon={faSearch} />
    </div>
  );
};

export default Searcher;