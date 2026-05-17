import React from 'react'

interface LinkPropsType {
    href: string,
    text: string
}

const Link = ({ href, text }: LinkPropsType) => {
    return (
        <a href={href}>
            {text}
        </a>
    )
}

export default Link