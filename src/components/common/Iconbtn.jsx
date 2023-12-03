import React from 'react'

const Iconbtn = ({
    text,
    onclickfunction,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) => {

    console.log("On Click Function = ", onclickfunction)

    return (
        <button
            disabled={disabled}
            onClick={onclickfunction}
            type={type}
            className={customClasses}
        >
            {
                children ? (
                    <div>
                        <span>{text}</span>
                        {children}
                    </div>
                ) : (text)
            }
        </button>
    )
}

export default Iconbtn
