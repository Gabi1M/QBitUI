import { MantineStyleSystemProps, Menu } from '@mantine/core';
import React from 'react';

export interface ContextMenuItem {
    text: string;
    icon?: React.ReactElement;
    callback: () => void;
}

interface Props extends MantineStyleSystemProps {
    items: ContextMenuItem[];
    control?: React.ReactElement;
}

const ContextMenu = ({ items, control, ...props }: Props) => (
    <Menu {...props} control={control}>
        {items.map((item) => (
            <Menu.Item key={item.text} icon={item.icon} onClick={item.callback}>
                {item.text}
            </Menu.Item>
        ))}
    </Menu>
);

export default ContextMenu;
