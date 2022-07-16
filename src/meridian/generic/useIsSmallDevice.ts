import useWindowSize from './useWindowSize';

const useIsSmallDevice = () => {
    const { width } = useWindowSize();
    return width < 450;
};

export default useIsSmallDevice;
