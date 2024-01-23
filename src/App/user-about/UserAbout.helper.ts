export const getParams = (idFrom: string | undefined) => {
  let id = null;
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
