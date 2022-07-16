import React from 'react';
import { Card, createStyles } from '@mantine/core';
import { TorrentInfo } from 'meridian/models';
import StatusInfo from './statusInfo';
import TitleAndMenu from './titleAndMenu';
import ProgressIndicator from './progressIndicator';
import FileInfo from './fileInfo';
import ConnectionInfo from './connectionInfo';

interface Props {
    torrent: TorrentInfo;
    selectable: boolean;
    selected: boolean;
    onSelectionChanged?: (hash: string, selected: boolean) => void;
}

const TorrentCard = ({ torrent, selectable, selected, onSelectionChanged }: Props) => {
    const styles = useStyles(selectable, selected);

    const toggleSelection = () => onSelectionChanged?.(torrent.hash, !selected);

    return (
        <Card
            p='sm'
            m='sm'
            withBorder
            radius='md'
            className={styles.classes.root}
            onClick={selectable ? toggleSelection : undefined}
        >
            <TitleAndMenu torrent={torrent} />
            <StatusInfo
                mt='lg'
                state={torrent.state}
                category={torrent.category}
                tags={torrent.tags}
                dlSpeed={torrent.dlspeed}
                upSpeed={torrent.upspeed}
            />
            <FileInfo mt='lg' savePath={torrent.save_path} size={torrent.size} />
            <ConnectionInfo
                mt='lg'
                seeders={torrent.num_seeds}
                leechers={torrent.num_leechs}
                ratio={torrent.ratio}
                progress={torrent.progress}
                eta={torrent.eta}
            />
            <ProgressIndicator mt='lg' progress={torrent.progress * 100} />
        </Card>
    );
};

const useStyles = (selectable: boolean, selected: boolean) =>
    createStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            borderLeftColor: selectable && selected ? theme.colors.blue : undefined,
            borderLeftWidth: 10,
            cursor: selectable ? 'pointer' : 'default',
        },
    }))();

export default TorrentCard;
