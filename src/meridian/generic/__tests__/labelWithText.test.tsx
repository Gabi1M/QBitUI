import React from 'react';

import { render } from '@testing-library/react';

import LabelWithText from '../labelWithText';

describe('LabelWithText', () => {
    it('should render as expected', () => {
        const result = render(<LabelWithText label='Something' text='Some text' />);
        expect(result.asFragment()).toMatchSnapshot();
    });
});
