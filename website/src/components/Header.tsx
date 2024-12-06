import React from 'react';

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="container mx-auto p-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </header>
    );
};

export default Header;