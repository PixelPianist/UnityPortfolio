import React from "react";
import Link from "next/link";
import Header from "@components/Header";
import ScrollTriggeredPipeline from "@components/animation/ScrollTriggeredPipeline";

export default function IndexPage() {
    return (
        <div>
            <Header
                title="Unity Automation Sample"
                subtitle="Demo of automated build & deployment for Unity games!"
            />
            <p className="text-gray-100 max-w-2xl mx-auto mt-4">
                - This is an open source project that I have built to demonstrate automated build & deployment for Unity games. Check out the project <Link href="https://github.com/PixelPianist/UnityPortfolio" className="text-blue-500 underline">here</Link> <br/>
                - Check out the <Link className="text-blue-500 underline" href="/games">Games</Link> and <Link href="/videos" className="text-blue-500 underline">Videos</Link> pages for more content. <br/>
                - Check out the visual pipeline below! Scroll down to see the pipeline in action.
            </p>
            <br/>

            <ScrollTriggeredPipeline />
        </div>
    );
}