import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import setAvatar from '../../../utils/setAvatar';

import { IUser } from '../../../redux/types';

interface IProps {
  item: IUser,
};


const UserItem = ({item}: IProps) => {
  return (
    <li
      onClick={() => console.log('alallaa')}
      className="chat-list-item"
    >
      <div
        data-isonline={item.isOnline}
        className="chat-list-item__ava-wrap"
      >
        <img src={setAvatar(item)} alt="user avatar" />
      </div>

      <div className="chat-list-item__info-block chat-list-item__info-block--search">
        <span className="chat-list-item__chat-name chat-list-item__chat-name--search">
          {item.name || 'NoNameNPC'}
        </span>
      </div>

      <div className="chat-list-item__utils-block chat-list-item__utils-block--search">
        <span className="chat-list-item__add-conversation">
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </li>
  );
};

export default UserItem;