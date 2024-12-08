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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViX2FjdGlvbnNfcm9sZV9zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdGh1Yl9hY3Rpb25zX3JvbGVfc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdEO0FBRWhELGlEQUF3RjtBQUV4RixNQUFhLHNCQUF1QixTQUFRLG1CQUFLO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsa0RBQWtEO1FBQ2xELE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQztRQUNqQyxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztRQUVwQywyQ0FBMkM7UUFDM0MsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDMUQsU0FBUyxFQUFFLElBQUksNEJBQWtCLENBQzdCLGdCQUFnQixJQUFJLENBQUMsT0FBTyxvREFBb0QsRUFDaEY7Z0JBQ0ksWUFBWSxFQUFFO29CQUNWLHlDQUF5QyxFQUFFLFFBQVEsU0FBUyxJQUFJLFVBQVUsSUFBSTtpQkFDakY7YUFDSixFQUNELCtCQUErQixDQUNsQztZQUNELFdBQVcsRUFBRSw0RUFBNEU7U0FDNUYsQ0FBQyxDQUFDO1FBRUgsaUNBQWlDO1FBQ2pDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLHlCQUFlLENBQUM7WUFDOUMsTUFBTSxFQUFFLGdCQUFNLENBQUMsS0FBSztZQUNwQixPQUFPLEVBQUU7Z0JBQ0wsNEJBQTRCO2dCQUM1Qiw0QkFBNEI7Z0JBQzVCLCtCQUErQjtnQkFDL0Isb0NBQW9DO2dCQUNwQyx1Q0FBdUM7Z0JBQ3ZDLDRCQUE0QjtnQkFDNUIsNEJBQTRCO2dCQUM1QixpQ0FBaUM7Z0JBQ2pDLDJCQUEyQjthQUM5QjtZQUNELFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNuQixDQUFDLENBQUMsQ0FBQztRQUVKLHFCQUFxQjtRQUNyQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSx5QkFBZSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFO2dCQUNMLGlCQUFpQjtnQkFDakIsaUJBQWlCO2dCQUNqQixjQUFjO2dCQUNkLGNBQWM7Z0JBQ2QsZUFBZTtnQkFDZixpQkFBaUI7YUFDcEI7WUFDRCxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSixzQkFBc0I7UUFDdEIsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUkseUJBQWUsQ0FBQztZQUM5QyxNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLO1lBQ3BCLE9BQU8sRUFBRTtnQkFDTCxnQkFBZ0I7Z0JBQ2hCLGdCQUFnQjtnQkFDaEIsc0JBQXNCO2dCQUN0QixzQkFBc0I7Z0JBQ3RCLGNBQWM7Z0JBQ2Qsa0JBQWtCO2dCQUNsQixrQkFBa0I7YUFDckI7WUFDRCxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSixzQkFBc0I7UUFDdEIsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUkseUJBQWUsQ0FBQztZQUM5QyxNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLO1lBQ3BCLE9BQU8sRUFBRTtnQkFDTCxrQkFBa0I7Z0JBQ2xCLG1CQUFtQjtnQkFDbkIseUJBQXlCO2dCQUN6QixrQkFBa0I7Z0JBQ2xCLHFCQUFxQjthQUN4QjtZQUNELFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNuQixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7Q0FDSjtBQWpGRCx3REFpRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCB7IFJvbGUsIEZlZGVyYXRlZFByaW5jaXBhbCwgUG9saWN5U3RhdGVtZW50LCBFZmZlY3QgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHaXRodWJBY3Rpb25zUm9sZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xyXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XHJcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IE1vdmUgdGhlc2UgdG8gYSBzaGFyZWQgY29uZmlndXJhdGlvbiBmaWxlXHJcbiAgICAgICAgY29uc3QgZ2l0aHViT3JnID0gJ1BpeGVsUGlhbmlzdCc7XHJcbiAgICAgICAgY29uc3QgZ2l0aHViUmVwbyA9ICdVbml0eVBvcnRmb2xpbyc7XHJcblxyXG4gICAgICAgIC8vIERlZmluZSB0aGUgT0lEQyB0cnVzdCBmb3IgR2l0SHViIEFjdGlvbnNcclxuICAgICAgICBjb25zdCBnaXRodWJBY3Rpb25zUm9sZSA9IG5ldyBSb2xlKHRoaXMsICdHaXRodWJBY3Rpb25zUm9sZScsIHtcclxuICAgICAgICAgICAgYXNzdW1lZEJ5OiBuZXcgRmVkZXJhdGVkUHJpbmNpcGFsKFxyXG4gICAgICAgICAgICAgICAgYGFybjphd3M6aWFtOjoke3RoaXMuYWNjb3VudH06b2lkYy1wcm92aWRlci90b2tlbi5hY3Rpb25zLmdpdGh1YnVzZXJjb250ZW50LmNvbWAsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJTdHJpbmdMaWtlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlbi5hY3Rpb25zLmdpdGh1YnVzZXJjb250ZW50LmNvbTpzdWJcIjogYHJlcG86JHtnaXRodWJPcmd9LyR7Z2l0aHViUmVwb306KmBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJzdHM6QXNzdW1lUm9sZVdpdGhXZWJJZGVudGl0eVwiXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUm9sZSBhc3N1bWVkIGJ5IEdpdEh1YiBBY3Rpb25zIHZpYSBPSURDIHRvIGRlcGxveSBpbmZyYXN0cnVjdHVyZSB1c2luZyBDREsnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBDbG91ZEZvcm1hdGlvbiBwZXJtaXNzaW9uc1xyXG4gICAgICAgIGdpdGh1YkFjdGlvbnNSb2xlLmFkZFRvUG9saWN5KG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xyXG4gICAgICAgICAgICBlZmZlY3Q6IEVmZmVjdC5BTExPVyxcclxuICAgICAgICAgICAgYWN0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpDcmVhdGVTdGFja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpVcGRhdGVTdGFja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpEZXNjcmliZVN0YWNrc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpEZXNjcmliZVN0YWNrRXZlbnRzXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3VkZm9ybWF0aW9uOkRlc2NyaWJlU3RhY2tSZXNvdXJjZXNcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246RGVsZXRlU3RhY2tcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246R2V0VGVtcGxhdGVcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvdWRmb3JtYXRpb246VmFsaWRhdGVUZW1wbGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG91ZGZvcm1hdGlvbjpMaXN0U3RhY2tzXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbXCIqXCJdXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgUzMgcGVybWlzc2lvbnNcclxuICAgICAgICBnaXRodWJBY3Rpb25zUm9sZS5hZGRUb1BvbGljeShuZXcgUG9saWN5U3RhdGVtZW50KHtcclxuICAgICAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwiczM6Q3JlYXRlQnVja2V0XCIsXHJcbiAgICAgICAgICAgICAgICBcInMzOkRlbGV0ZUJ1Y2tldFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzMzpQdXRPYmplY3RcIixcclxuICAgICAgICAgICAgICAgIFwiczM6R2V0T2JqZWN0XCIsXHJcbiAgICAgICAgICAgICAgICBcInMzOkxpc3RCdWNrZXRcIixcclxuICAgICAgICAgICAgICAgIFwiczM6RGVsZXRlT2JqZWN0XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbXCIqXCJdXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgSUFNIHBlcm1pc3Npb25zXHJcbiAgICAgICAgZ2l0aHViQWN0aW9uc1JvbGUuYWRkVG9Qb2xpY3kobmV3IFBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgICAgICAgIGVmZmVjdDogRWZmZWN0LkFMTE9XLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBbXHJcbiAgICAgICAgICAgICAgICBcImlhbTpDcmVhdGVSb2xlXCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpEZWxldGVSb2xlXCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpBdHRhY2hSb2xlUG9saWN5XCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpEZXRhY2hSb2xlUG9saWN5XCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpQYXNzUm9sZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpYW06Q3JlYXRlUG9saWN5XCIsXHJcbiAgICAgICAgICAgICAgICBcImlhbTpEZWxldGVQb2xpY3lcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICByZXNvdXJjZXM6IFtcIipcIl1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIFNTTSBwZXJtaXNzaW9uc1xyXG4gICAgICAgIGdpdGh1YkFjdGlvbnNSb2xlLmFkZFRvUG9saWN5KG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xyXG4gICAgICAgICAgICBlZmZlY3Q6IEVmZmVjdC5BTExPVyxcclxuICAgICAgICAgICAgYWN0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgXCJzc206R2V0UGFyYW1ldGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcInNzbTpHZXRQYXJhbWV0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICBcInNzbTpHZXRQYXJhbWV0ZXJzQnlQYXRoXCIsXHJcbiAgICAgICAgICAgICAgICBcInNzbTpQdXRQYXJhbWV0ZXJcIixcclxuICAgICAgICAgICAgICAgIFwic3NtOkRlbGV0ZVBhcmFtZXRlclwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHJlc291cmNlczogW1wiKlwiXVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=