import React from 'react';

import { render } from '@testing-library/react';

import { MockTorrents } from 'meridian/mock';
import { TorrentInfo } from 'meridian/models';
import { withMantineModals, withReduxState } from 'meridian/testing';

import TorrentCard from '../card';

describe('Card', () => {
    it('should render as expected', () => {
        const result = render(
            withReduxState(
                withMantineModals(
                    <TorrentCard
                        torrent={MockTorrents[0] as TorrentInfo}
                        selectable={false}
                        selected={false}
                        onSelectionChanged={jest.fn()}
                    />,
                ),
            ),
        );
        expect(result.asFragment()).toMatchSnapshot();
    });
});
