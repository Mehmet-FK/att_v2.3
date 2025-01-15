self.onmessage = (event) => {
  const entities = event.data;

  // Function implementation
  const prepareEntitiesForAutoCompleteSelect = (entities) => {
    if (!entities) return [];
    return entities.map((entity) => ({
      id: entity.id,
      name: entity.name,
      caption: entity.id + " - " + entity.caption,
    }));
  };

  // Process workflows and send the result back
  const result = prepareEntitiesForAutoCompleteSelect(entities);
  self.postMessage(result);
};
