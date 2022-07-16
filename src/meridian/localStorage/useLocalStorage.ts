import LocalStorage from './localStorage';
import { LocalStorageKey } from './types';

const useLocalStorage = () => {
    const setValue = <T>(key: LocalStorageKey, value: T) => LocalStorage.setValue<T>(key, value);
    const getValue = <T>(key: LocalStorageKey) => LocalStorage.getValue<T>(key);
    return { setValue, getValue };
};

export default useLocalStorage;
