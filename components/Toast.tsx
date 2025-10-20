import React, { useState, useEffect } from 'react';

interface ToastProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

export const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#333',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000,
        }}>
            {message}
        </div>
    );
};