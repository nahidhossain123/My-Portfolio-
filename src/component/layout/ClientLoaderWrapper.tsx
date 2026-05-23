'use client';

import { useState } from 'react';
import Loader from '../Loader';
import { LoaderContext } from '@/src/app/hooks/contextApi/LoaderContenxt';


const ClientLoaderWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);

    return (
        <LoaderContext.Provider value={!loading}>
            {loading && <Loader onFinish={() => setLoading(false)} />}
            <div>
                {children}
            </div>
        </LoaderContext.Provider>
    );
};

export default ClientLoaderWrapper;