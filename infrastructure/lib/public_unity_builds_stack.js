"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicUnityBuildsStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class PublicUnityBuildsStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const bucket = new aws_s3_1.Bucket(this, 'PublicUnityBuildsBucket', {
            bucketName: 'public-unity-builds',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.RETAIN,
            // Define CORS configuration
            cors: [
                {
                    allowedMethods: [aws_s3_1.HttpMethods.GET, aws_s3_1.HttpMethods.HEAD],
                    allowedOrigins: [
                        "https://www.michael-james-hart.vercel.app",
                        "https://michael-james-hart.vercel.app",
                        "http://localhost:3000"
                    ],
                    allowedHeaders: ["*"],
                    exposedHeaders: [],
                    maxAge: 3000
                }
            ]
        });
        // Add bucket policy statements
        // 1. Allows s3:GetObject for all objects in the bucket
        bucket.addToResourcePolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
            principals: [new aws_iam_1.AnyPrincipal()],
            actions: ['s3:GetObject'],
            resources: [`${bucket.bucketArn}/*`]
        }));
        // 2. Allows s3:ListBucket on the bucket itself
        bucket.addToResourcePolicy(new aws_iam_1.PolicyStatement({
            sid: 'AllowPublicListingOfBucket',
            effect: aws_iam_1.Effect.ALLOW,
            principals: [new aws_iam_1.AnyPrincipal()],
            actions: ['s3:ListBucket'],
            resources: [bucket.bucketArn]
        }));
    }
}
exports.PublicUnityBuildsStack = PublicUnityBuildsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX3VuaXR5X2J1aWxkc19zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInB1YmxpY191bml0eV9idWlsZHNfc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQStEO0FBRS9ELCtDQUF5RDtBQUN6RCxpREFBNEU7QUFFNUUsTUFBYSxzQkFBdUIsU0FBUSxtQkFBSztJQUM3QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUN2RCxVQUFVLEVBQUUscUJBQXFCO1lBQ2pDLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE1BQU07WUFDbkMsNEJBQTRCO1lBQzVCLElBQUksRUFBRTtnQkFDRjtvQkFDSSxjQUFjLEVBQUUsQ0FBQyxvQkFBVyxDQUFDLEdBQUcsRUFBRSxvQkFBVyxDQUFDLElBQUksQ0FBQztvQkFDbkQsY0FBYyxFQUFFO3dCQUNaLDJDQUEyQzt3QkFDM0MsdUNBQXVDO3dCQUN2Qyx1QkFBdUI7cUJBQzFCO29CQUNELGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQztvQkFDckIsY0FBYyxFQUFFLEVBQUU7b0JBQ2xCLE1BQU0sRUFBRSxJQUFJO2lCQUNmO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFFSCwrQkFBK0I7UUFDL0IsdURBQXVEO1FBQ3ZELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLHlCQUFlLENBQUM7WUFDM0MsTUFBTSxFQUFFLGdCQUFNLENBQUMsS0FBSztZQUNwQixVQUFVLEVBQUUsQ0FBQyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztZQUNoQyxPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDekIsU0FBUyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUM7U0FDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSiwrQ0FBK0M7UUFDL0MsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUkseUJBQWUsQ0FBQztZQUMzQyxHQUFHLEVBQUUsNEJBQTRCO1lBQ2pDLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUs7WUFDcEIsVUFBVSxFQUFFLENBQUMsSUFBSSxzQkFBWSxFQUFFLENBQUM7WUFDaEMsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQzFCLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0NBQ0o7QUF6Q0Qsd0RBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIFJlbW92YWxQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgeyBCdWNrZXQsIEh0dHBNZXRob2RzIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcclxuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50LCBFZmZlY3QsIEFueVByaW5jaXBhbCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFB1YmxpY1VuaXR5QnVpbGRzU3RhY2sgZXh0ZW5kcyBTdGFjayB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnVja2V0ID0gbmV3IEJ1Y2tldCh0aGlzLCAnUHVibGljVW5pdHlCdWlsZHNCdWNrZXQnLCB7XHJcbiAgICAgICAgICAgIGJ1Y2tldE5hbWU6ICdwdWJsaWMtdW5pdHktYnVpbGRzJyxcclxuICAgICAgICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5SRVRBSU4sXHJcbiAgICAgICAgICAgIC8vIERlZmluZSBDT1JTIGNvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAgY29yczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRNZXRob2RzOiBbSHR0cE1ldGhvZHMuR0VULCBIdHRwTWV0aG9kcy5IRUFEXSxcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd2VkT3JpZ2luczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vd3d3Lm1pY2hhZWwtamFtZXMtaGFydC52ZXJjZWwuYXBwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9taWNoYWVsLWphbWVzLWhhcnQudmVyY2VsLmFwcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd2VkSGVhZGVyczogW1wiKlwiXSxcclxuICAgICAgICAgICAgICAgICAgICBleHBvc2VkSGVhZGVyczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4QWdlOiAzMDAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGJ1Y2tldCBwb2xpY3kgc3RhdGVtZW50c1xyXG4gICAgICAgIC8vIDEuIEFsbG93cyBzMzpHZXRPYmplY3QgZm9yIGFsbCBvYmplY3RzIGluIHRoZSBidWNrZXRcclxuICAgICAgICBidWNrZXQuYWRkVG9SZXNvdXJjZVBvbGljeShuZXcgUG9saWN5U3RhdGVtZW50KHtcclxuICAgICAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXHJcbiAgICAgICAgICAgIHByaW5jaXBhbHM6IFtuZXcgQW55UHJpbmNpcGFsKCldLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBbJ3MzOkdldE9iamVjdCddLFxyXG4gICAgICAgICAgICByZXNvdXJjZXM6IFtgJHtidWNrZXQuYnVja2V0QXJufS8qYF1cclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIC8vIDIuIEFsbG93cyBzMzpMaXN0QnVja2V0IG9uIHRoZSBidWNrZXQgaXRzZWxmXHJcbiAgICAgICAgYnVja2V0LmFkZFRvUmVzb3VyY2VQb2xpY3kobmV3IFBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgICAgICAgIHNpZDogJ0FsbG93UHVibGljTGlzdGluZ09mQnVja2V0JyxcclxuICAgICAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXHJcbiAgICAgICAgICAgIHByaW5jaXBhbHM6IFtuZXcgQW55UHJpbmNpcGFsKCldLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBbJ3MzOkxpc3RCdWNrZXQnXSxcclxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbYnVja2V0LmJ1Y2tldEFybl1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn1cclxuIl19