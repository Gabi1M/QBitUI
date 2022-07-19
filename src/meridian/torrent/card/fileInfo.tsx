import React from 'react';

import { t } from '@lingui/macro';

import { Group, MantineStyleSystemProps } from '@mantine/core';

import { LabelWithText } from 'meridian/generic';
import { bytesToSize } from 'meridian/utils';

interface Props extends MantineStyleSystemProps {
    savePath: string;
    size: number;
}

const FileInfo = ({ savePath, size, ...props }: Props) => (
    <Group {...props}>
        <LabelWithText label={t`Save path`} text={savePath} />
        <LabelWithText label={t`Size`} text={bytesToSize(size)} />
    </Group>
);

export default React.memo(FileInfo);
