import React, { createContext, useContext, useState, useCallback } from 'react';

export const RelationConfigProvider = ({ children, ...relationConfig }) => {
  const [refreshToken, setRefreshToken] = useState(0),
    refresh = useCallback(() => {
      setRefreshToken(new Date().getTime());
    }, []);
  return React.createElement(
    OwnerRecordContext.Provider,
    { value: { ...relationConfig, refreshToken, refresh } },
    children,
  );
};

const OwnerRecordContext = createContext(null);
export const useRelationConfig = () => {
  const a = useContext(OwnerRecordContext);
  if (!a)
    throw new Error('useRelationConfig used outside of RelationConfigProvider');
  return a;
};
