import React from 'react'
import classNames from 'classnames'
import useNavigation from '../hooks/useNavigation'
const Link = ({ to, children, className, activeLink }) => {
    const { navigate, currentPath } = useNavigation()
    const classs = classNames('text-blue-500', className,currentPath===to && activeLink)
    const handleClick = (e) => {
        if (e.metaKey || e.ctrlKey) {
            return;
        }
        e.preventDefault()
        navigate(to)
    }
    //href is added to work as default behaviour when click the link using crtl + clik
    return <a className={classs} href = {to} onClick={handleClick} >{children}</a>
}

export default Link