import { useSpring, animated } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import "./alert.scss"

const Alert = ({ message, visible, onClose, type }) => {
    const [bgColor, setBgColor] = useState("#f44336");

    const updateBgColor = () => {
        switch (type) {
            case "success":
                setBgColor("#3CB371")
                break;
            case "error":
                setBgColor("#f44336")
                break;
            case "warning":
                setBgColor("#F39C12")
                break;
            default:
                break;
        }
    }

    const slideIn = useSpring({
        transform: visible ? 'translateX(0%)' : 'translateX(200%)',
        config: { tension: 220, friction: 30 }
    });

    useEffect(() => {
        updateBgColor()
    }, [type])

    if(!visible) return null;

    return (
        <animated.div style={{...slideIn, backgroundColor: bgColor}} className="floating-alert">
            <div className="alert-content">
                {message}
                <button className="close-button" onClick={onClose}> &times; </button>
            </div>
        </animated.div>
    )
}

export default Alert