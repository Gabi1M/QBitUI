import React from 'react';

export interface WindowSize {
    height: number;
    width: number;
}

const useWindowSize = () => {
    const [size, setSize] = React.useState<WindowSize>({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setSize({ height: window.innerHeight, width: window.innerWidth });
        });
    }, []);

    return size;
};

export default useWindowSize;
