import { Menu } from '@mantine/core';
import React from 'react';

export interface ContextMenuItem {
    text: string;
    icon?: React.ReactElement;
    callback: () => void;
}

interface Props {
    items: ContextMenuItem[];
    control?: React.ReactElement;
}

const ContextMenu = ({ items, control }: Props) => {
    return (
        <Menu control={control}>
            {items.map(item => <Menu.Item key={item.text} icon={item.icon} onClick={item.callback}>{item.text}</Menu.Item>)}
        </Menu>
    )
};

export default ContextMenu;