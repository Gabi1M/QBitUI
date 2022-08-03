import React, { useCallback, useState } from 'react';

const useManageSelection = () => {
    const [selectionEnabled, setSelectionEnabled] = useState(false);
    const [keys, setKeys] = useState<string[]>([]);

    const onSelectionChanged = useCallback(
        (key: string, selected: boolean) => {
            if (!selected && keys.includes(key)) {
                setKeys(keys.filter((x) => x !== key));
            } else if (selected && !keys.includes(key)) {
                setKeys([...keys, key]);
            }
        },
        [keys, setKeys],
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
