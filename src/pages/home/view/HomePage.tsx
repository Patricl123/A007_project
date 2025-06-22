import { type FC } from 'react';
import { HeroBlock } from 'widgets/heroBlock';
import { Platform } from 'widgets/platform';
import { Interactive } from 'widgets/interactive';

export const HomePage: FC = () => {
    return (
        <>
            <HeroBlock />
            <Platform />
            <Interactive />
        </>
    );
};
