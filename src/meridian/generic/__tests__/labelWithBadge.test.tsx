import React from 'react';

import { render } from '@testing-library/react';

import LabelWithBadge from '../labelWithBadge';

describe('LabelWithBadge', () => {
    it('should render as expected', () => {
        const result = render(<LabelWithBadge label='Something' text='Some text' color='#FFFFF' />);
        expect(result.asFragment()).toMatchSnapshot();
    });
});
