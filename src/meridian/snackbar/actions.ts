export enum SnackbarAction {
    SHOW_SNACKBAR = 'SHOW_SNACKBAR',
}

export interface ShowSnackbarAction {
    type: SnackbarAction;
    text: string;
    variant: 'default' | 'error' | 'info' | 'success' | 'warning';
    autoHideDuration?: number;
}

export const showSnackbarAction = (
    text: string,
    variant: 'default' | 'error' | 'info' | 'success' | 'warning',
    autoHideDuration?: number
): ShowSnackbarAction => ({
    type: SnackbarAction.SHOW_SNACKBAR,
    text,
    variant,
    autoHideDuration,
});
