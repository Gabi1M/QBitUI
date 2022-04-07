import React from 'react';
import { t } from '@lingui/macro';
import { useSelector } from 'react-redux';
import { Card } from 'meridian/generic';
import { CardItemProps } from 'meridian/generic/card';
import { bytesToSize } from 'meridian/utils';
import { selectTransferInfo } from './state';
import { LoadingOverlay } from '@mantine/core';

const TransferInfoCard = () => {
    const transferInfo = useSelector(selectTransferInfo);

    const itemGroups: CardItemProps[][] = React.useMemo(() => transferInfo ? ([
        [
            {
                name: t`Download speed`,
                value: bytesToSize(transferInfo.dl_info_speed)
            }, {
                name: t`Upload speed`,
                value: bytesToSize(transferInfo.up_info_speed)
            }
        ], [
            {
                name: t`Total downloaded`,
                value: bytesToSize(transferInfo.dl_info_data)
            }, {
                name: t`Total uploaded`,
                value: bytesToSize(transferInfo.up_info_data)
            }
        ]
    ]) : [], [transferInfo]);

    if(!transferInfo) {
        return <LoadingOverlay visible={true} />;
    }

    return (
        <Card itemGroups={itemGroups} title={t`Transfer info`} />
    )
};

export default TransferInfoCard;