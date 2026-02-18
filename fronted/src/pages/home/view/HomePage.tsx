import { type FC } from 'react';
import { Platform } from 'widgets/platform';
import { Interactive } from 'widgets/interactive';
import { HeroBlock } from 'widgets/heroBlock';

export const HomePage: FC = () => {
    return (
        <>
            <HeroBlock />
            <Platform />
            <Interactive />
        </>
    );
};
