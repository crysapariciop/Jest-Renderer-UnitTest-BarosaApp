export const findUrlsInString = (message: string) => {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message?.match(urlRegex);
};

export const getQueryParams = (params: string, url: string) => {
  let href = url;
  let reg = new RegExp('[?&]' + params + '=([^&#]*)', 'i');
  let queryString = reg.exec(href);
  return queryString ? queryString[1] : null;
};
