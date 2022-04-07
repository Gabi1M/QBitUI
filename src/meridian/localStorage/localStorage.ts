import { LocalStorageKey } from './types';

class LocalStorage {
    static setValue = <T>(key: LocalStorageKey, value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    static getValue = <T>(key: LocalStorageKey) => {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : null;
    };
}

export default LocalStorage;
