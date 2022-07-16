import React from 'react';
import { Text, TextProps } from '@mantine/core';
import { truncateLongText } from 'meridian/utils';
import useIsSmallDevice from './useIsSmallDevice';

const ResponsiveText = ({ children, ...props }: TextProps<'div'>) => {
    const isSmallDevice = useIsSmallDevice();
    const text = children?.toString() || '';
    return (
        <Text {...props}>{isSmallDevice ? truncateLongText(text) : text}</Text>
    );
};

export default React.memo(ResponsiveText);
