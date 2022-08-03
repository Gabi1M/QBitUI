import React from 'react';

import { MantineStyleSystemProps, Menu } from '@mantine/core';

export interface ContextMenuItem {
    text: string;
    icon?: React.ReactElement;
    callback: () => void;
}

interface Props extends MantineStyleSystemProps {
    items: ContextMenuItem[];
    control: React.ReactElement;
}

const ContextMenu = ({ items, control, ...props }: Props) => (
    <Menu withinPortal withArrow position='bottom-end' transition='pop' {...props}>
        <Menu.Target>{control}</Menu.Target>
        <Menu.Dropdown>
            {items.map((item) => (
                <Menu.Item key={item.text} icon={item.icon} onClick={item.callback}>
                    {item.text}
                </Menu.Item>
            ))}
        </Menu.Dropdown>
    </Menu>
);

export default ContextMenu;
