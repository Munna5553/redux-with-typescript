import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: "text" | "password" | "email";
    name?: string;
    placeholder?: string;
    className?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    type = "text",
    name,
    placeholder,
    className = "",
    startIcon,
    endIcon,
    ...props
}, ref) => {
    return (
        <div className="relative w-full  flex items-center rounded-md">
            {startIcon && (
                <span className="absolute left-3 text-base cursor-pointer text-black">
                    {startIcon}
                </span>
            )}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                className={`w-full outline-none bg-[#EEE] py-3 text-black rounded-lg focus:outline-blue-600 focus:bg-[#F5F5F7] ${className}`}
                {...props}
                ref={ref}
            />
            {endIcon && (
                <span className="absolute right-3 text-base cursor-pointer text-black">
                    {endIcon}
                </span>
            )}
        </div>
    );
});

export default Input;