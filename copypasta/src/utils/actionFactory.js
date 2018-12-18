const actionFactory = (actionType, ...payloadNames) => (...payloads) => {
  const payloadObjs = payloadNames.map((name, index) => ({ [name]: payloads[index] }));
  return Object.assign({}, { type: actionType }, ...payloadObjs);
};

export default actionFactory;
