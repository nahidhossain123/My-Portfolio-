'use client';

import { createContext, useContext } from 'react';

export const LoaderContext = createContext(false);

export const useLoader = () => useContext(LoaderContext);