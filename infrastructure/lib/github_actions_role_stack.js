"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubActionsRoleStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class GithubActionsRoleStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // TODO: Move these to a shared configuration file
        const githubOrg = 'PixelPianist';
        const githubRepo = 'UnityPortfolio';
        // Define the OIDC trust for GitHub Actions
        const githubActionsRole = new aws_iam_1.Role(this, 'GithubActionsRole', {
            assumedBy: new aws_iam_1.FederatedPrincipal(`arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`, {
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": `repo:${githubOrg}/${githubRepo}:*`
                }
            }, "sts:AssumeRoleWithWebIdentity"),
            description: 'Role assumed by GitHub Actions via OIDC to deploy infrastructure using CDK'
        });
        // Add CloudFormation permissions
        githubActionsRole.addToPolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
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
        githubActionsRole.addToPolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
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
        // Add IAM permissions if your CDK app creates roles/policies
        githubActionsRole.addToPolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
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
    }
}
exports.GithubActionsRoleStack = GithubActionsRoleStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViX2FjdGlvbnNfcm9sZV9zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdGh1Yl9hY3Rpb25zX3JvbGVfc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdEO0FBRWhELGlEQUF3RjtBQUV4RixNQUFhLHNCQUF1QixTQUFRLG1CQUFLO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsa0RBQWtEO1FBQ2xELE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQztRQUNqQyxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztRQUVwQywyQ0FBMkM7UUFDM0MsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDMUQsU0FBUyxFQUFFLElBQUksNEJBQWtCLENBQzdCLGdCQUFnQixJQUFJLENBQUMsT0FBTyxvREFBb0QsRUFDaEY7Z0JBQ0ksWUFBWSxFQUFFO29CQUNWLHlDQUF5QyxFQUFFLFFBQVEsU0FBUyxJQUFJLFVBQVUsSUFBSTtpQkFDakY7YUFDSixFQUNELCtCQUErQixDQUNsQztZQUNELFdBQVcsRUFBRSw0RUFBNEU7U0FDNUYsQ0FBQyxDQUFDO1FBRUgsaUNBQWlDO1FBQ2pDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLHlCQUFlLENBQUM7WUFDOUMsTUFBTSxFQUFFLGdCQUFNLENBQUMsS0FBSztZQUNwQixPQUFPLEVBQUU7Z0JBQ0wsNEJBQTRCO2dCQUM1Qiw0QkFBNEI7Z0JBQzVCLCtCQUErQjtnQkFDL0Isb0NBQW9DO2dCQUNwQyx1Q0FBdUM7Z0JBQ3ZDLDRCQUE0QjtnQkFDNUIsNEJBQTRCO2dCQUM1QixpQ0FBaUM7Z0JBQ2pDLDJCQUEyQjthQUM5QjtZQUNELFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNuQixDQUFDLENBQUMsQ0FBQztRQUVKLHFCQUFxQjtRQUNyQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSx5QkFBZSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFO2dCQUNMLGlCQUFpQjtnQkFDakIsaUJBQWlCO2dCQUNqQixjQUFjO2dCQUNkLGNBQWM7Z0JBQ2QsZUFBZTtnQkFDZixpQkFBaUI7YUFDcEI7WUFDRCxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSiw2REFBNkQ7UUFDN0QsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUkseUJBQWUsQ0FBQztZQUM5QyxNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLO1lBQ3BCLE9BQU8sRUFBRTtnQkFDTCxnQkFBZ0I7Z0JBQ2hCLGdCQUFnQjtnQkFDaEIsc0JBQXNCO2dCQUN0QixzQkFBc0I7Z0JBQ3RCLGNBQWM7Z0JBQ2Qsa0JBQWtCO2dCQUNsQixrQkFBa0I7YUFDckI7WUFDRCxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0NBQ0o7QUFwRUQsd0RBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgeyBSb2xlLCBGZWRlcmF0ZWRQcmluY2lwYWwsIFBvbGljeVN0YXRlbWVudCwgRWZmZWN0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgR2l0aHViQWN0aW9uc1JvbGVTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIGEgc2hhcmVkIGNvbmZpZ3VyYXRpb24gZmlsZVxyXG4gICAgICAgIGNvbnN0IGdpdGh1Yk9yZyA9ICdQaXhlbFBpYW5pc3QnO1xyXG4gICAgICAgIGNvbnN0IGdpdGh1YlJlcG8gPSAnVW5pdHlQb3J0Zm9saW8nO1xyXG5cclxuICAgICAgICAvLyBEZWZpbmUgdGhlIE9JREMgdHJ1c3QgZm9yIEdpdEh1YiBBY3Rpb25zXHJcbiAgICAgICAgY29uc3QgZ2l0aHViQWN0aW9uc1JvbGUgPSBuZXcgUm9sZSh0aGlzLCAnR2l0aHViQWN0aW9uc1JvbGUnLCB7XHJcbiAgICAgICAgICAgIGFzc3VtZWRCeTogbmV3IEZlZGVyYXRlZFByaW5jaXBhbChcclxuICAgICAgICAgICAgICAgIGBhcm46YXdzOmlhbTo6JHt0aGlzLmFjY291bnR9Om9pZGMtcHJvdmlkZXIvdG9rZW4uYWN0aW9ucy5naXRodWJ1c2VyY29udGVudC5jb21gLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiU3RyaW5nTGlrZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW4uYWN0aW9ucy5naXRodWJ1c2VyY29udGVudC5jb206c3ViXCI6IGByZXBvOiR7Z2l0aHViT3JnfS8ke2dpdGh1YlJlcG99OipgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwic3RzOkFzc3VtZVJvbGVXaXRoV2ViSWRlbnRpdHlcIlxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JvbGUgYXNzdW1lZCBieSBHaXRIdWIgQWN0aW9ucyB2aWEgT0lEQyB0byBkZXBsb3kgaW5mcmFzdHJ1Y3R1cmUgdXNpbmcgQ0RLJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgQ2xvdWRGb3JtYXRpb24gcGVybWlzc2lvbnNcclxuICAgICAgICBnaXRodWJBY3Rpb25zUm9sZS5hZGRUb1BvbGljeShuZXcgUG9saWN5U3RhdGVtZW50KHtcclxuICAgICAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246Q3JlYXRlU3RhY2tcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246VXBkYXRlU3RhY2tcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246RGVzY3JpYmVTdGFja3NcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246RGVzY3JpYmVTdGFja0V2ZW50c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpEZXNjcmliZVN0YWNrUmVzb3VyY2VzXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOkRlbGV0ZVN0YWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOkdldFRlbXBsYXRlXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOlZhbGlkYXRlVGVtcGxhdGVcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246TGlzdFN0YWNrc1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHJlc291cmNlczogW1wiKlwiXVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIFMzIHBlcm1pc3Npb25zXHJcbiAgICAgICAgZ2l0aHViQWN0aW9uc1JvbGUuYWRkVG9Qb2xpY3kobmV3IFBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgICAgICAgIGVmZmVjdDogRWZmZWN0LkFMTE9XLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBbXHJcbiAgICAgICAgICAgICAgICBcInMzOkNyZWF0ZUJ1Y2tldFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzMzpEZWxldGVCdWNrZXRcIixcclxuICAgICAgICAgICAgICAgIFwiczM6UHV0T2JqZWN0XCIsXHJcbiAgICAgICAgICAgICAgICBcInMzOkdldE9iamVjdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzMzpMaXN0QnVja2V0XCIsXHJcbiAgICAgICAgICAgICAgICBcInMzOkRlbGV0ZU9iamVjdFwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHJlc291cmNlczogW1wiKlwiXVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIElBTSBwZXJtaXNzaW9ucyBpZiB5b3VyIENESyBhcHAgY3JlYXRlcyByb2xlcy9wb2xpY2llc1xyXG4gICAgICAgIGdpdGh1YkFjdGlvbnNSb2xlLmFkZFRvUG9saWN5KG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xyXG4gICAgICAgICAgICBlZmZlY3Q6IEVmZmVjdC5BTExPVyxcclxuICAgICAgICAgICAgYWN0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgXCJpYW06Q3JlYXRlUm9sZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpYW06RGVsZXRlUm9sZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpYW06QXR0YWNoUm9sZVBvbGljeVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpYW06RGV0YWNoUm9sZVBvbGljeVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpYW06UGFzc1JvbGVcIixcclxuICAgICAgICAgICAgICAgIFwiaWFtOkNyZWF0ZVBvbGljeVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpYW06RGVsZXRlUG9saWN5XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbXCIqXCJdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==