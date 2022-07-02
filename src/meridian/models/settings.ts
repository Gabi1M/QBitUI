import { Language } from 'meridian/i18n/types';

export interface Settings {
    darkMode: boolean;
    autoRefresh: boolean;
    autoRefreshInterval: number;
    torrentsPerPage: number;
    language: Language;
}
