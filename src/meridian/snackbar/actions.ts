export enum SnackbarAction {
    SHOW_SNACKBAR = 'SHOW_SNACKBAR',
}

export type SnackbarVariant = 'default' | 'error' | 'info' | 'success' | 'warning';

export interface ShowSnackbarAction {
    type: SnackbarAction;
    text: string;
    variant: SnackbarVariant;
    autoHideDuration?: number;
}

export const showSnackbarAction = (
    text: string,
    variant: SnackbarVariant,
    autoHideDuration?: number,
): ShowSnackbarAction => ({
    type: SnackbarAction.SHOW_SNACKBAR,
    text,
    variant,
    autoHideDuration,
});
