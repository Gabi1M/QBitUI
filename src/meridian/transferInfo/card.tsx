import React from 'react';
import { t } from '@lingui/macro';
import { useSelector } from 'react-redux';
import { bytesToSize } from 'meridian/utils';
import { Card, LoadingOverlay } from '@mantine/core';
import { LabelWithText } from 'meridian/generic';
import { selectTransferInfo } from './state';

const TransferInfoCard = () => {
    const transferInfo = useSelector(selectTransferInfo);

    if (!transferInfo) {
        return <LoadingOverlay visible />;
    }

    return (
        <Card withBorder radius='md'>
            <LabelWithText
                label={t`Download speed`}
                text={bytesToSize(transferInfo.dl_info_speed)}
            />
            <LabelWithText
                label={t`Upload speed`}
                text={bytesToSize(transferInfo?.up_info_speed)}
            />
            <LabelWithText
                label={t`Total downloaded`}
                text={bytesToSize(transferInfo?.dl_info_data)}
            />
            <LabelWithText
                label={t`Total uploaded`}
                text={bytesToSize(transferInfo?.up_info_data)}
            />
        </Card>
    );
};

export default TransferInfoCard;
