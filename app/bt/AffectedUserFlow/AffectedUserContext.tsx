import React, { createContext, useState, useContext } from 'react';

interface AffectedUserContextState {
  healthAuthority: HealthAuthority;
  code: string;
  setCode: (code: string) => void;
}

const AffectedUserContext = createContext<AffectedUserContextState | undefined>(
  undefined,
);

export const AffectedUserProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [code, setCode] = useState('');

  const healthAuthority = {
    name: 'Test HA',
  };

  return (
    <AffectedUserContext.Provider value={{ healthAuthority, code, setCode }}>
      {children}
    </AffectedUserContext.Provider>
  );
};

export const useAffectedUserContext = (): AffectedUserContextState => {
  const context = useContext(AffectedUserContext);
  if (context === undefined) {
    throw new Error('TracingStrategyContext must be used with a provider');
  }
  return context;
};
