import { Preferences } from 'meridian/models';

export interface SectionProps {
    preferences: Partial<Preferences> | undefined;
    updatePreferencesKey: (
        name: keyof Preferences,
        value: string | boolean | number | string[]
    ) => void;
    updateBulkPreferencesKey: (
        items: {
            name: keyof Preferences;
            value: string | boolean | number | string[];
        }[]
    ) => void;
}
