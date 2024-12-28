"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const pipelineSteps = [
    {
        id: 0,
        icon: "💻",
        shortTitle: "Update Game",
        longTitle: "Add a feature, fix a bug, or make a change to a Unity game",
        description: "Make changes to a Unity game project, create a feature branch, and push to GitHub.",
        inDevelopment: false
    },
    {
        id: 1,
        icon: "⚙️",
        shortTitle: "Pull Request",
        longTitle: "Tests, data validation, and build checks",
        description: "GitHub Actions runs playmode tests, edit mode tests, creates a WebGL build, and uploads it to S3 " +
            "in a test environment for review. Low level shared code Unity packages allow for data validation and parametrized tests.",
        inDevelopment: true,
    },
    {
        id: 2,
        icon: "✅",
        shortTitle: "Merge",
        longTitle: "Code Review, Approval, and Merge",
        description: "Code is approved by a code owner and merged into the main branch.",
        inDevelopment: false
    },
    {
        id: 3,
        icon: "📦",
        shortTitle: "Version",
        longTitle: "Create a new version and update changelog",
        description: "GitHub Actions creates a new version, updates the changelog, and tags the release. If applicable, " +
            "we can also create Unity packages for shared code by running `npm publish` and host on GitHub package " +
            "registry.",
        inDevelopment: true
    },
    {
        id: 4,
        icon: "🚀",
        shortTitle: "Release",
        longTitle: "Deploy to Production",
        description: "Pipeline builds the web version and deploys it to S3. Next.js auto-updates to list the new game.",
        inDevelopment: true
    },
    {
        id: 5,
        icon: "🌐",
        shortTitle: "Web",
        longTitle: "Web development workflow",
        description: "Next.js frontend lists Unity games, fetches data from AWS S3, and auto-updates on new releases. " +
            "As the website is updated, Vercel handles the deployment and updates GitHub with a check status.",
        inDevelopment: false
    },
    {
        id: 6,
        icon: "🏗️",
        shortTitle: "Infra",
        longTitle: "AWS infrastructure as code",
        description: "AWS CDK provisions S3 buckets and CloudFront distributions for hosting the website " +
            "and game builds. If changes are made to IaC, GitHub Actions will deploy the changes on merge to main.",
        inDevelopment: false
    },
    {
        id: 7,
        icon: "🛠️",
        shortTitle: "KUP",
        longTitle: "toolKit for Unity Portfolio",
        description: "KUP is a javascript CLI tool for managing a mono-repository of Unity projects. It provides " +
            "commands for creating new projects, updating dependencies, data validation, and more.",
        inDevelopment: true
    }
];

export default function ScrollLinkedPipelineWithTabs() {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });

    useEffect(() => {
        function onScroll() {
            if (!containerRef.current) return;
            const scrollTop = containerRef.current?.scrollTop;
            const containerHeight = containerRef.current?.clientHeight;
            const index = Math.floor(scrollTop / containerHeight);
            const clampedIndex = Math.max(0, Math.min(index, pipelineSteps.length - 1));
            setActiveSectionIndex(clampedIndex);
        }

        const containerEl = containerRef.current;
        if (containerEl) {
            containerEl.addEventListener("scroll", onScroll);
        }
        return () => {
            if (containerEl) containerEl.removeEventListener("scroll", onScroll);
        };
    }, []);

    const totalScrollableHeight = pipelineSteps.length * (containerRef.current?.clientHeight || 0);
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, totalScrollableHeight]);

    function handleTabClick(index: number) {
        const el = sectionRefs.current[index];
        if (el && containerRef.current) {
            if ("scrollTo" in containerRef.current) {
                containerRef.current.scrollTo({
                    top: el.offsetTop,
                    behavior: "smooth",
                });
            }
        }
    }

    return (
        <div className="relative w-full h-screen overflow-hidden flex px-4 md:px-16 lg:px-32">
            <div className="flex flex-col items-start justify-start bg-white dark:bg-gray-800 shadow z-10 w-1/4">
                {pipelineSteps.map((step, index) => (
                    <button
                        key={step.id}
                        className={`w-full p-4 cursor-pointer bg-none border-none outline-none text-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                            activeSectionIndex === index ? "border-l-4 border-pink-500 text-pink-500" : "border-l-4 border-transparent text-gray-800 dark:text-gray-200"
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {step.shortTitle}
                    </button>
                ))}
            </div>
            <motion.div
                className="absolute top-0 left-0 transform-origin-left h-1 bg-pink-500"
                style={{ scaleX }}
            />
            <div ref={containerRef} className="flex-1 overflow-y-scroll snap-y snap-mandatory">
                {pipelineSteps.map((step, idx) => (
                    <div
                        key={step.id}
                        ref={(el) => {
                            sectionRefs.current[idx] = el;
                        }}
                        className="snap-start min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                    >
                        <div className="text-6xl mb-2">{step.icon}</div>
                        <h3 className="text-center text-2xl font-bold">{step.longTitle}</h3>
                        <p className="text-center px-4">{step.description}</p>
                        {step.inDevelopment && (
                            <p className="text-xs text-yellow-500 mt-2">In Development</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}