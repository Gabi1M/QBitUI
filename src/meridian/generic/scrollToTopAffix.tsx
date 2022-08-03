import React from 'react';

import { ArrowUp } from 'tabler-icons-react';

import { ActionIcon, Affix, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

import { addTestId } from 'meridian/testing';

const ScrollToTopAffix = () => {
    const [scroll, scrollTo] = useWindowScroll();

    const onClick = () => {
        scrollTo({ y: 0 });
    };

    return (
        <Affix position={{ bottom: 20, right: 75 }}>
            <Transition transition='slide-up' mounted={scroll.y > 0}>
                {(transitionStyles) => (
                    <ActionIcon
                        style={transitionStyles}
                        onClick={onClick}
                        variant='filled'
                        color='blue'
                        size='xl'
                        radius='xl'
                        {...addTestId('affixButton')}
                    >
                        <ArrowUp />
                    </ActionIcon>
                )}
            </Transition>
        </Affix>
    );
};

export default ScrollToTopAffix;
