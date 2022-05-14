/* eslint-disable */

import { MainData, TorrentInfo } from "meridian/models";

export const transformMainData = (mainData: MainData) => {
    mainData.torrents = Object.entries(mainData.torrents).reduce(
        (result, [hash, torrent]) => (
            (result[hash] = { ...torrent, hash }), result
        ),
        {} as Record<string, TorrentInfo>
    );
    return mainData;
}