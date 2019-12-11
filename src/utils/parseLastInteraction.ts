export default (normalizedData: any) => {
  const newEntities: any = {}

  for (const key in normalizedData.entities) {
    if (normalizedData.entities[key].lastInteraction) {
      newEntities[key] = {
        ...normalizedData.entities[key],
         lastInteraction: JSON.parse(normalizedData.entities[key].lastInteraction)
      };
    }
    else {
      newEntities[key] = normalizedData.entities[key];
    }
  }

  return {ids: normalizedData.ids, entities: newEntities};
};