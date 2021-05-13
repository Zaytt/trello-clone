import React, { PropsWithChildren, ComponentType, useState, useEffect } from 'react';
import { AppState } from './context/AppStateContext';
import { load } from './api/api';

export const withData = (
  WrappedComponent: ComponentType<PropsWithChildren<{ initialState: AppState }>>
) => {
  return ({ children }: PropsWithChildren<{}>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<boolean | undefined>();
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: undefined,
    });

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load();
          setInitialState(data);
        } catch (error) {
          setError(error);
        }
        setIsLoading(false);
      };

      fetchInitialState();
    }, []);

    return isLoading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <WrappedComponent initialState={initialState}>{children}</WrappedComponent>
    );
  };
};
