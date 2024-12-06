import axios from 'axios';
import {parseStringPromise} from 'xml2js';

interface S3ListBucketResult {
    ListBucketResult: {
        Contents: {
            Key: string[];
        }[];
    };
}

export const fetchGameDirectories = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_GAMES_BUCKET_URL}`);
        const result = await parseStringPromise(response.data) as S3ListBucketResult;

        return result.ListBucketResult.Contents
            .map(content => content.Key[0].split('/')[0])
            .filter((value, index, self) => self.indexOf(value) === index && value);
    }
    catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};