import React from 'react'
import { IconName, icons } from './icons';
interface Props {
    name: IconName;
    size?: number;
    text?: string;
    onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    iconStyle?: string;
}
const IconButton = ({
    name,
    size = 20,
    text,
    onclick,
    className = "",
    iconStyle = ""
}: Props) => {
    const SvgIcon = icons[name];
    return (
        <button
            onClick={onclick}
            className={`flex items-center gap-2 text-icon dark:text-white text-sm font-bold hover:scale-[1.1] transition-all ${className}`}
        >
            <SvgIcon className={`w-4 h-4 md:w-6 md:h-6 shrink-0 ${iconStyle}`} />
            {text && <span className='text-[12px] text-textSecondary dark:text-white'>{text}</span>}
        </button>

    )
}

export default IconButton