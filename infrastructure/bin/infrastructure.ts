#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { PublicUnityBuildsStack } from '../lib/public_unity_builds_stack';
import { GithubActionsRoleStack } from '../lib/github_actions_role_stack';

const app = new App();
new PublicUnityBuildsStack(app, 'PublicUnityBuildsStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    }
});

new GithubActionsRoleStack(app, 'GithubActionsRoleStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    }
});