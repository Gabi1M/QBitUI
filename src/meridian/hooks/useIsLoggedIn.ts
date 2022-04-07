import { selectSessionIsLoggedIn } from 'meridian/session';
import { useSelector } from 'react-redux';

export const useIsLoggedIn = () => useSelector(selectSessionIsLoggedIn);
