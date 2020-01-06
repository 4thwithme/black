import React, { useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import throttle from "../../utils/throttle";
import API from "../../api/api";
import { IUser, IChat } from "../../redux/types";

interface IProps {
  classNamePrefix: string;
  setSearchState: (arr: IUser[] | IChat[]) => void;
  setQuery: (query: string) => void;
  query: string;
}

const Searcher = (props: IProps) => {
  const { classNamePrefix, setQuery } = props;

  return (
    <div className={`${classNamePrefix}__searcher-wrap`}>
      <input
        value={props.query}
        type='text'
        className={`${classNamePrefix}__input`}
        onChange={(e) => setQuery(e.target.value)}
      />

      <FontAwesomeIcon className={`${classNamePrefix}__icon`} icon={faSearch} />
    </div>
  );
};

export default Searcher;
