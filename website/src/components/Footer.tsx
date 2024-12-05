import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 p-4">
            <div className="container mx-auto text-center text-gray-400">
                &copy; {new Date().getFullYear()} Unity Portfolio. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;