import React, { memo } from 'react';

import { t } from '@lingui/macro';

import { LabelWithText } from 'meridian/generic';
import { TorrentProperties } from 'meridian/models';
import { bytesToSize, calculateEtaString } from 'meridian/utils';

type Props = Pick<
    TorrentProperties,
    | 'save_path'
    | 'total_size'
    | 'share_ratio'
    | 'creation_date'
    | 'created_by'
    | 'addition_date'
    | 'time_elapsed'
    | 'comment'
>;

const GeneralTab = (props: Props) => {
    const items = {
        [t`Save path`]: props.save_path,
        [t`Size`]: bytesToSize(props.total_size),
        [t`Share ratio`]: props.share_ratio.toFixed(2),
        [t`Time elapsed`]: calculateEtaString(props.time_elapsed),
        [t`Creation date`]: new Date(props.creation_date).toLocaleString(),
        [t`Addition date`]: new Date(props.addition_date).toLocaleString(),
        [t`Comment`]: props.comment,
        [t`Created by`]: props.created_by,
    };

    return (
        <>
            {Object.entries(items).map(([label, text], index) => (
                <LabelWithText key={index} my='sm' label={label} text={text} />
            ))}
        </>
    );
};

export default memo(GeneralTab);
