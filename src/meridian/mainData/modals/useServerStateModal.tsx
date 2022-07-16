import React from 'react';
import { t } from '@lingui/macro';
import { useSelector } from 'react-redux';
import { useModals } from '@mantine/modals';
import { LoadingOverlay } from '@mantine/core';
import { commonModalConfiguration, LabelWithText } from 'meridian/generic';
import { bytesToSize } from 'meridian/utils';
import { selectMainData } from '../state';

const ServerStateModal = () => {
    const mainData = useSelector(selectMainData);

    if (!mainData) {
        return <LoadingOverlay visible />;
    }

    const transferInfo = mainData.server_state;

    return (
        <>
            <LabelWithText
                label={t`Download speed`}
                text={bytesToSize(transferInfo.dl_info_speed)}
            />
            <LabelWithText
                mt='md'
                label={t`Upload speed`}
                text={bytesToSize(transferInfo.up_info_speed)}
            />
            <LabelWithText
                mt='md'
                label={t`Total downloaded ( alltime )`}
                text={bytesToSize(transferInfo.alltime_dl)}
            />
            <LabelWithText
                mt='md'
                label={t`Total uploaded ( alltime )`}
                text={bytesToSize(transferInfo.alltime_ul)}
            />
            <LabelWithText
                mt='md'
                label={t`Total downloaded ( session )`}
                text={bytesToSize(transferInfo.dl_info_data)}
            />
            <LabelWithText
                mt='md'
                label={t`Total uploaded ( session )`}
                text={bytesToSize(transferInfo.up_info_data)}
            />
            <LabelWithText mt='md' label={t`Global ratio`} text={transferInfo.global_ratio} />
            <LabelWithText
                mt='md'
                label={t`Free space on disk`}
                text={bytesToSize(transferInfo.free_space_on_disk)}
            />
            <LabelWithText
                mt='md'
                label={t`Total peers`}
                text={transferInfo.total_peer_connections.toString()}
            />
        </>
    );
};

const useServerStateModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            title: t`Server state`,
            children: <ServerStateModal />,
            ...commonModalConfiguration,
        });
};

export default useServerStateModal;
