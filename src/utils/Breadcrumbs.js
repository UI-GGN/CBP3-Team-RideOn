export const getBreadcrumbsValues = (pathname) => {
  return pathname.split("/").slice(1);
};
