import { type FC } from 'react';
import { Dropdown } from 'shared/ui';

export const HomePage: FC = () => {
    return (
        <>
            <Dropdown
                placeholder="choose"
                options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3', disabled: true },
                ]}
            />
        </>
    );
};
