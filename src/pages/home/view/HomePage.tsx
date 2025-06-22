import { type FC } from 'react';
import { HeroBlock } from 'widgets/heroBlock/view/HeroBlock';
import { Platform } from 'widgets/platform/view/Platform';

export const HomePage: FC = () => {
    return (
        <>
            <HeroBlock />
            <Platform />
        </>
    );
};
