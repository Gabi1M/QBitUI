/* eslint-disable */
import { MainData, TorrentInfo } from 'meridian/models';

import { MockCategories } from './categories';
import { MockTags } from './tags';
import { MockTorrents } from './torrents';
import { MockTransferInfo } from './transferInfo';

export const MockMainData: MainData = {
    categories: MockCategories,
    categories_removed: [],
    full_update: false,
    rid: 1,
    server_state: MockTransferInfo,
    tags: MockTags,
    tags_removed: [],
    torrents: (MockTorrents as TorrentInfo[]).reduce(
        (res, el) => ((res[el.hash] = el), res),
        {} as Record<string, TorrentInfo>,
    ),
    torrents_removed: [],
    trackers: {},
};
