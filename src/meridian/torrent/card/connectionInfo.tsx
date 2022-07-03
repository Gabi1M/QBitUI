import React from 'react';
import { t } from '@lingui/macro';
import { Group, MantineStyleSystemProps } from '@mantine/core';
import { LabelWithText } from 'meridian/generic';
import { TORRENT_INVALID_ETA } from 'meridian/models';
import { calculateEtaString } from 'meridian/utils';

interface Props extends MantineStyleSystemProps {
    seeders: number;
    leechers: number;
    ratio: number;
    progress: number;
    eta: number;
}

const ConnectionInfo = ({
    seeders,
    leechers,
    ratio,
    progress,
    eta,
    ...props
}: Props) => (
    <Group {...props}>
        <LabelWithText label={t`Seeders`} text={seeders.toString()} />
        <LabelWithText label={t`Leechers`} text={leechers.toString()} />
        <LabelWithText label={t`Ratio`} text={ratio.toFixed(2)} />
        {progress !== 1 && eta !== TORRENT_INVALID_ETA ? (
            <LabelWithText
                label={t`Remaining time`}
                text={calculateEtaString(eta)}
            />
        ) : null}
    </Group>
);

export default React.memo(ConnectionInfo);
