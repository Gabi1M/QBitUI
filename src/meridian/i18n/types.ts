import { Icons } from "meridian/icons";
import { t } from '@lingui/macro';

export enum Language {
    ENGLISH = 'en',
    ROMANIAN = 'ro',
}

export const LanguageName = {
    [Language.ENGLISH]: t`English`,
    [Language.ROMANIAN]: t`Romanian`,
};

export const LanguageIcon = {
    [Language.ENGLISH]: Icons.UNITED_STATES,
    [Language.ROMANIAN]: Icons.ROMANIA,
}