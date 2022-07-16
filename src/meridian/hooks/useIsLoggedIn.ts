import { useSelector } from 'react-redux';

import { selectSessionIsLoggedIn } from 'meridian/session';

export const useIsLoggedIn = () => useSelector(selectSessionIsLoggedIn);
