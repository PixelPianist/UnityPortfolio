﻿# Unity Portfolio

Welcome to the **Unity Porfolio** project, a comprehensive demonstration how to set up a Next.js website that has multiple Unity projects that can be demoed. This project integrates a set of Unity WebGL games with a Next-based website, showcasing automated testing, code coverage, and continuous deployment.

## Table of Contents

- [Project Overview](#project-overview)
- [Unity Project](./unity-projects/README.md)
- [React App](./react-app/README.md)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Contact](#contact)

## Project Overview

This project consists of two main components:

1. **Unity Projects**: A set of small Unity games built for WebGL.
2. **React App**: A React-based website that embeds the Unity game, displays code coverage reports, and showcases PlayMode test screenshots. The website is deployed using a modern web hosting framework and integrates with AWS S3 for asset storage.

Automation is achieved through GitHub Actions, which handle building, testing, deploying, and uploading necessary assets to AWS S3.

## Unity Project

For detailed information about the Unity projects, including setup instructions, testing procedures, and build processes, please refer to the [Unity Project README](./unity-projects/README.md).

## React App

For detailed information about the React application, including how to integrate the Unity game, fetch and display reports from AWS S3, and deployment steps, please refer to the [React App README](./react-app/README.md).

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Unity](https://unity.com/) (version specified in the Unity project README)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/PixelPianist/UnityPortfolio.git
   cd UnityPortfolio
   ```

2. **Install Dependencies**

   ```bash
   cd website && npm install && cd ..
   ```
