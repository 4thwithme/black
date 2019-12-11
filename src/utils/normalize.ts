export interface IDataItem<T> {
  [key: string]: T; // id
};

interface IEntities<T> {
  [key: string]: IDataItem<T>;
};

export interface INormalizeResult<T> {
  entities: IEntities<T>;
  ids: T[];
};

export default <T extends IDataItem<T>>(data: Array<T>, key: string = '_id'): INormalizeResult<T> => {
  const entities: IEntities<T> = {};

  const ids: T[] = data.map((dataItem: T) => {
    const id: any = dataItem[key];

    entities[id] = dataItem;

    return id;
  });

  return { entities, ids };
};