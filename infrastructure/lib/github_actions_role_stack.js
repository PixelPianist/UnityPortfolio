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
            description: 'Role assumed by GitHub Actions via OIDC to deploy infrastructure using CDK',
            roleName: 'GithubActionsRole'
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
        // Add IAM permissions
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
        // Add SSM permissions
        githubActionsRole.addToPolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
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
exports.GithubActionsRoleStack = GithubActionsRoleStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViX2FjdGlvbnNfcm9sZV9zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdGh1Yl9hY3Rpb25zX3JvbGVfc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdEO0FBRWhELGlEQUF3RjtBQUV4RixNQUFhLHNCQUF1QixTQUFRLG1CQUFLO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsa0RBQWtEO1FBQ2xELE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQztRQUNqQyxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztRQUVwQywyQ0FBMkM7UUFDM0MsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDMUQsU0FBUyxFQUFFLElBQUksNEJBQWtCLENBQzdCLGdCQUFnQixJQUFJLENBQUMsT0FBTyxvREFBb0QsRUFDaEY7Z0JBQ0ksWUFBWSxFQUFFO29CQUNWLHlDQUF5QyxFQUFFLFFBQVEsU0FBUyxJQUFJLFVBQVUsSUFBSTtpQkFDakY7YUFDSixFQUNELCtCQUErQixDQUNsQztZQUNELFdBQVcsRUFBRSw0RUFBNEU7WUFDekYsUUFBUSxFQUFFLG1CQUFtQjtTQUNoQyxDQUFDLENBQUM7UUFFSCxpQ0FBaUM7UUFDakMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUkseUJBQWUsQ0FBQztZQUM5QyxNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLO1lBQ3BCLE9BQU8sRUFBRTtnQkFDTCw0QkFBNEI7Z0JBQzVCLDRCQUE0QjtnQkFDNUIsK0JBQStCO2dCQUMvQixvQ0FBb0M7Z0JBQ3BDLHVDQUF1QztnQkFDdkMsNEJBQTRCO2dCQUM1Qiw0QkFBNEI7Z0JBQzVCLGlDQUFpQztnQkFDakMsMkJBQTJCO2FBQzlCO1lBQ0QsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUoscUJBQXFCO1FBQ3JCLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLHlCQUFlLENBQUM7WUFDOUMsTUFBTSxFQUFFLGdCQUFNLENBQUMsS0FBSztZQUNwQixPQUFPLEVBQUU7Z0JBQ0wsaUJBQWlCO2dCQUNqQixpQkFBaUI7Z0JBQ2pCLGNBQWM7Z0JBQ2QsY0FBYztnQkFDZCxlQUFlO2dCQUNmLGlCQUFpQjthQUNwQjtZQUNELFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNuQixDQUFDLENBQUMsQ0FBQztRQUVKLHNCQUFzQjtRQUN0QixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSx5QkFBZSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFO2dCQUNMLGdCQUFnQjtnQkFDaEIsZ0JBQWdCO2dCQUNoQixzQkFBc0I7Z0JBQ3RCLHNCQUFzQjtnQkFDdEIsY0FBYztnQkFDZCxrQkFBa0I7Z0JBQ2xCLGtCQUFrQjthQUNyQjtZQUNELFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNuQixDQUFDLENBQUMsQ0FBQztRQUVKLHNCQUFzQjtRQUN0QixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSx5QkFBZSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFO2dCQUNMLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQix5QkFBeUI7Z0JBQ3pCLGtCQUFrQjtnQkFDbEIscUJBQXFCO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztDQUNKO0FBbEZELHdEQWtGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0IHsgUm9sZSwgRmVkZXJhdGVkUHJpbmNpcGFsLCBQb2xpY3lTdGF0ZW1lbnQsIEVmZmVjdCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdpdGh1YkFjdGlvbnNSb2xlU3RhY2sgZXh0ZW5kcyBTdGFjayB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogTW92ZSB0aGVzZSB0byBhIHNoYXJlZCBjb25maWd1cmF0aW9uIGZpbGVcclxuICAgICAgICBjb25zdCBnaXRodWJPcmcgPSAnUGl4ZWxQaWFuaXN0JztcclxuICAgICAgICBjb25zdCBnaXRodWJSZXBvID0gJ1VuaXR5UG9ydGZvbGlvJztcclxuXHJcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBPSURDIHRydXN0IGZvciBHaXRIdWIgQWN0aW9uc1xyXG4gICAgICAgIGNvbnN0IGdpdGh1YkFjdGlvbnNSb2xlID0gbmV3IFJvbGUodGhpcywgJ0dpdGh1YkFjdGlvbnNSb2xlJywge1xyXG4gICAgICAgICAgICBhc3N1bWVkQnk6IG5ldyBGZWRlcmF0ZWRQcmluY2lwYWwoXHJcbiAgICAgICAgICAgICAgICBgYXJuOmF3czppYW06OiR7dGhpcy5hY2NvdW50fTpvaWRjLXByb3ZpZGVyL3Rva2VuLmFjdGlvbnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tYCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIlN0cmluZ0xpa2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRva2VuLmFjdGlvbnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tOnN1YlwiOiBgcmVwbzoke2dpdGh1Yk9yZ30vJHtnaXRodWJSZXBvfToqYFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInN0czpBc3N1bWVSb2xlV2l0aFdlYklkZW50aXR5XCJcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSb2xlIGFzc3VtZWQgYnkgR2l0SHViIEFjdGlvbnMgdmlhIE9JREMgdG8gZGVwbG95IGluZnJhc3RydWN0dXJlIHVzaW5nIENESycsXHJcbiAgICAgICAgICAgIHJvbGVOYW1lOiAnR2l0aHViQWN0aW9uc1JvbGUnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBDbG91ZEZvcm1hdGlvbiBwZXJtaXNzaW9uc1xyXG4gICAgICAgIGdpdGh1YkFjdGlvbnNSb2xlLmFkZFRvUG9saWN5KG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xyXG4gICAgICAgICAgICBlZmZlY3Q6IEVmZmVjdC5BTExPVyxcclxuICAgICAgICAgICAgYWN0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpDcmVhdGVTdGFja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpVcGRhdGVTdGFja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpEZXNjcmliZVN0YWNrc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpEZXNjcmliZVN0YWNrRXZlbnRzXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOkRlc2NyaWJlU3RhY2tSZXNvdXJjZXNcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246RGVsZXRlU3RhY2tcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246R2V0VGVtcGxhdGVcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246VmFsaWRhdGVUZW1wbGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpMaXN0U3RhY2tzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbXCIqXCJdXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgUzMgcGVybWlzc2lvbnNcclxuICAgICAgICBnaXRodWJBY3Rpb25zUm9sZS5hZGRUb1BvbGljeShuZXcgUG9saWN5U3RhdGVtZW50KHtcclxuICAgICAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiczM6Q3JlYXRlQnVja2V0XCIsXHJcbiAgICAgICAgICAgICAgICBcInMzOkRlbGV0ZUJ1Y2tldFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzMzpQdXRPYmplY3RcIixcclxuICAgICAgICAgICAgICAgIFwiczM6R2V0T2JqZWN0XCIsXHJcbiAgICAgICAgICAgICAgICBcInMzOkxpc3RCdWNrZXRcIixcclxuICAgICAgICAgICAgICAgIFwiczM6RGVsZXRlT2JqZWN0XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbXCIqXCJdXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgSUFNIHBlcm1pc3Npb25zXHJcbiAgICAgICAgZ2l0aHViQWN0aW9uc1JvbGUuYWRkVG9Qb2xpY3kobmV3IFBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgICAgICAgIGVmZmVjdDogRWZmZWN0LkFMTE9XLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBbXHJcbiAgICAgICAgICAgICAgICBcImlhbTpDcmVhdGVSb2xlXCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpEZWxldGVSb2xlXCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpBdHRhY2hSb2xlUG9saWN5XCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpEZXRhY2hSb2xlUG9saWN5XCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpQYXNzUm9sZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpYW06Q3JlYXRlUG9saWN5XCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpEZWxldGVQb2xpY3lcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICByZXNvdXJjZXM6IFtcIipcIl1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIFNTTSBwZXJtaXNzaW9uc1xyXG4gICAgICAgIGdpdGh1YkFjdGlvbnNSb2xlLmFkZFRvUG9saWN5KG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xyXG4gICAgICAgICAgICBlZmZlY3Q6IEVmZmVjdC5BTExPVyxcclxuICAgICAgICAgICAgYWN0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgXCJzc206R2V0UGFyYW1ldGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcInNzbTpHZXRQYXJhbWV0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICBcInNzbTpHZXRQYXJhbWV0ZXJzQnlQYXRoXCIsXHJcbiAgICAgICAgICAgICAgICBcInNzbTpQdXRQYXJhbWV0ZXJcIixcclxuICAgICAgICAgICAgICAgIFwic3NtOkRlbGV0ZVBhcmFtZXRlclwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHJlc291cmNlczogW1wiKlwiXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=