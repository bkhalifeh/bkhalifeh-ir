export const useRedirectUrl = () => {
  const a = new URL(location.href); // Remove current redirectUrl to prevent infinite redirections
  return (
    a.searchParams.get('redirectUrl') && a.searchParams.delete('redirectUrl'),
    a.href
  );
};
