export interface InputProps {
    size?: 'medium' | 'short' | 'long';
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    placeholder?: string;
    value?: string | number;
    defaultValue?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    name?: string;
    id?: string;
    className?: string;
    required?: boolean;
    autoFocus?: boolean;
    pattern?: string;
    fullWidth?: boolean;
    isPaddingLeft?: boolean;
    children?: React.ReactNode;
}
