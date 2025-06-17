export interface CustomButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large ;';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}
