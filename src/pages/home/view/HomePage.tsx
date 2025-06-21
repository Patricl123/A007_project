import { type FC } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
    return (
        <div style={{ background: 'pink', height: '100vh' }}>
            <h2>HomePage</h2>
            <Link to={'/login'}>
                <button>click to open login</button>
            </Link>
        </div>
    );
};
