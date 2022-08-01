import React, { useEffect, useState } from 'react';

export interface WindowSize {
    height: number;
    width: number;
}

const useWindowSize = () => {
    const [size, setSize] = useState<WindowSize>({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    useEffect(() => {
        window.addEventListener('resize', () => {
            setSize({ height: window.innerHeight, width: window.innerWidth });
        });
    }, []);

    return size;
};

export default useWindowSize;
