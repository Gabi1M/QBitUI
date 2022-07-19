import React from 'react';
import { useSelector } from 'react-redux';

import { t } from '@lingui/macro';

import { Card, LoadingOverlay } from '@mantine/core';

import { LabelWithText } from 'meridian/generic';
import { selectMainData } from 'meridian/mainData';
import { bytesToSize } from 'meridian/utils';

const TransferInfoCard = () => {
    const mainData = useSelector(selectMainData);
    const transferInfo = mainData?.server_state;

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
            <LabelWithText label={t`Downloaded`} text={bytesToSize(transferInfo?.dl_info_data)} />
            <LabelWithText label={t`Uploaded`} text={bytesToSize(transferInfo?.up_info_data)} />
        </Card>
    );
};

export default TransferInfoCard;
