export const getParams = (idFrom: string | undefined) => {
  let id = 1;
  if (idFrom) {
    const tmp = Number.parseInt(idFrom);
    if (Number.isFinite(tmp)) {
      id = tmp;
    }
  }
  return {
    id,
  };
};
