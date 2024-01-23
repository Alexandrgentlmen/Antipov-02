export const getSearchParams = (searchParams: URLSearchParams) => {
  const pageFromSearchParams = searchParams.get('page');
  let page = 1;
  if (pageFromSearchParams !== null) {
    const tmp = Number.parseInt(pageFromSearchParams);
    if (Number.isFinite(tmp)) {
      page = tmp;
    }
  }
  return {
    page,
  };
};
