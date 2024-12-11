import Link from 'next/link';

const NavBar = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link href="/" className="hover:text-blue-400">
                        Michael Hart&#39;s Portfolio
                    </Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/games" className="hover:text-blue-400 hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200">
                            Games
                        </Link>
                    </li>
                    <li>
                        <Link href="/videos" className="hover:text-blue-400 hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200">
                            Videos
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;