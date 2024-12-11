import React from 'react';
import Header from '@components/Header';

const IndexPage = () => {
    return (
        <div>
            {/* Header */}
            <Header
                title="Unity Automation Sample"
                subtitle="Welcome to my portfolio! This website is intended to show how you can set up infrastructure 
                to automatically build and deploy Unity games to the web."
            />
            <p className="text-gray-100 max-w-2xl mx-auto mt-4">
                This project demonstrates the following:
            </p>
            <ul className="text-gray-100 max-w-2xl mx-auto mt-4 list-disc list-inside pl-4">
                <li className="mb-2 text-gray-100">
                    A Next.js frontend that lists available Unity games on an S3 bucket.
                </li>
                <li className="mb-2 text-gray-100">
                    Unity games are automatically built and released to an S3 bucket via GitHub Actions.
                </li>
                <li className="mb-2 text-gray-100">
                    AWS infrastructure created using AWS CDK to host the games.
                </li>
            </ul>
            <p className="text-gray-100 max-w-2xl mx-auto mt-4">
                Navigate using the links in the header navigation bar to view available games and videos.
            </p>
        </div>
    );
};

export default IndexPage;
