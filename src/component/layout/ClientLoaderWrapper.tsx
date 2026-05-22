'use client';

import { useState } from 'react';
import Loader from '../Loader';


const ClientLoaderWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && <Loader onFinish={() => setLoading(false)} />}
            <div>
                {children}
            </div>
        </>
    );
};

export default ClientLoaderWrapper;