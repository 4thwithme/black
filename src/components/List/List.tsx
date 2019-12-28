import React, { ReactType } from 'react';


interface IPropsList {
  className: string,
  listItems: any[],
  component: ReactType,
  listItemProps?: any,
  loadMore?: (offset: number) => void,
  listLoadPending?: boolean,
};

const List = (props: IPropsList) => {
  const {
    className,
    listItems,
    component: ListItemComponent,
  } = props;

  return (
    <ul className={className}>
      {listItems.map(listItem => {
        return <ListItemComponent
          key={listItem._id || listItem}
          item={listItem}
          {...props.listItemProps} />
      })}
    </ul>
  )
};


export default List;