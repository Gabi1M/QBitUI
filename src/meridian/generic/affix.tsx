import React from 'react';
import { ArrowUp } from 'tabler-icons-react';
import { ActionIcon, Affix, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

const AppAffix = () => {
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <Affix position={{ bottom: 20, right: 20 }}>
            <Transition transition='slide-up' mounted={scroll.y > 0}>
                {transitionStyles => (
                    <ActionIcon
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: 0 })}
                        variant='filled'
                        color='blue'
                        size='xl'
                        radius='xl'
                    >
                        <ArrowUp />
                    </ActionIcon>
                )}
            </Transition>
        </Affix>
    );
};

export default AppAffix;
