import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockScrollTo = jest.fn();

jest.mock('@mantine/hooks', () => ({
    ...jest.requireActual('@mantine/hooks'),
    useWindowScroll: jest.fn().mockReturnValue([{ y: 10 }, mockScrollTo]),
}));

import ScrollToTopAffix from '../scrollToTopAffix';

describe('ScrollToTopAffix', () => {
    beforeEach(() => {
        mockScrollTo.mockReset();
    });

    it('should render as expected', () => {
        const result = render(<ScrollToTopAffix />);
        expect(result.asFragment()).toMatchSnapshot();
    });

    it('should call scroll to top on click', async () => {
        render(<ScrollToTopAffix />);
        await userEvent.click(screen.getByTestId('affixButton'));
        expect(mockScrollTo).toHaveBeenCalled();
    });
});
