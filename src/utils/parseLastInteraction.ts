import { INormalizeResult, IEntities } from "../redux/types";

export default <T>(normalizedData: INormalizeResult<T>): INormalizeResult<T> => {
  const newEntities: IEntities<T> = {}

  for (const key in normalizedData.entities) {
    if (normalizedData.entities[key].lastInteraction) {
      const last: any = normalizedData.entities[key].lastInteraction;

      newEntities[key] = {
        ...normalizedData.entities[key],
        lastInteraction: JSON.parse(last)
      };
    }
    else {
      newEntities[key] = normalizedData.entities[key];
    }
  }

  return {ids: normalizedData.ids, entities: newEntities};
};