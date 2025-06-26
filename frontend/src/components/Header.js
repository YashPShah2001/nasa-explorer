import React from 'react';

export default function Header() {
    return(
        <header className='bg-black py-2 shadow'>
            <div className='d-flex align-items-center'>
                <img src='/assets/nasa-logo.svg' alt='Nasa-logo' height={40} className='me-3' />
                <h4 className='text-white mb-0'>NASA Explorer</h4>
            </div>
        </header>
    )
};