import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { PolicyStatement, Effect, AnyPrincipal } from 'aws-cdk-lib/aws-iam';

export class PublicUnityBuildsStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const bucket = new Bucket(this, 'PublicUnityBuildsBucket', {
            bucketName: 'public-unity-builds',
            removalPolicy: RemovalPolicy.RETAIN,
            // Define CORS configuration
            cors: [
                {
                    allowedMethods: [HttpMethods.GET, HttpMethods.HEAD],
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
        bucket.addToResourcePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            principals: [new AnyPrincipal()],
            actions: ['s3:GetObject'],
            resources: [`${bucket.bucketArn}/*`]
        }));

        // 2. Allows s3:ListBucket on the bucket itself
        bucket.addToResourcePolicy(new PolicyStatement({
            sid: 'AllowPublicListingOfBucket',
            effect: Effect.ALLOW,
            principals: [new AnyPrincipal()],
            actions: ['s3:ListBucket'],
            resources: [bucket.bucketArn]
        }));
    }
}
