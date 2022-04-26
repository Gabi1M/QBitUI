import React from 'react';

const useManageSelection = () => {
    const [selectionEnabled, setSelectionEnabled] = React.useState(false);
    const [keys, setKeys] = React.useState<string[]>([]);

    const onSelectionChanged = React.useCallback(
        (key: string, selected: boolean) => {
            if (!selected && keys.includes(key)) {
                setKeys(keys.filter(x => x !== key));
            } else if (selected && !keys.includes(key)) {
                setKeys([...keys, key]);
            }
        },
        [keys, setKeys]
    );

    const clearSelection = () => setKeys([]);

    return {
        selectionEnabled,
        setSelectionEnabled,
        keys,
        onSelectionChanged,
        clearSelection,
    };
};

export default useManageSelection;
