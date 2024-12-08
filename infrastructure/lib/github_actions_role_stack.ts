import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Role, FederatedPrincipal, PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';

export class GithubActionsRoleStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // TODO: Move these to a shared configuration file
        const githubOrg = 'PixelPianist';
        const githubRepo = 'UnityPortfolio';

        // Define the OIDC trust for GitHub Actions
        const githubActionsRole = new Role(this, 'GithubActionsRole', {
            assumedBy: new FederatedPrincipal(
                `arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`,
                {
                    "StringLike": {
                        "token.actions.githubusercontent.com:sub": `repo:${githubOrg}/${githubRepo}:*`
                    }
                },
                "sts:AssumeRoleWithWebIdentity"
            ),
            description: 'Role assumed by GitHub Actions via OIDC to deploy infrastructure using CDK'
        });

        // Add CloudFormation permissions
        githubActionsRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: [
                "cloudformation:CreateStack",
                "cloudformation:UpdateStack",
                "cloudformation:DescribeStacks",
                "cloudformation:DescribeStackEvents",
                "cloudformation:DescribeStackResources",
                "cloudformation:DeleteStack",
                "cloudformation:GetTemplate",
                "cloudformation:ValidateTemplate",
                "cloudformation:ListStacks"
            ],
            resources: ["*"]
        }));

        // Add S3 permissions
        githubActionsRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: [
                "s3:CreateBucket",
                "s3:DeleteBucket",
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            resources: ["*"]
        }));

        // Add IAM permissions
        githubActionsRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: [
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:AttachRolePolicy",
                "iam:DetachRolePolicy",
                "iam:PassRole",
                "iam:CreatePolicy",
                "iam:DeletePolicy"
            ],
            resources: ["*"]
        }));
        
        // Add SSM permissions
        githubActionsRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: [
                "ssm:GetParameter",
                "ssm:GetParameters",
                "ssm:GetParametersByPath",
                "ssm:PutParameter",
                "ssm:DeleteParameter"
            ],
            resources: ["*"]
        }));
    }
}
