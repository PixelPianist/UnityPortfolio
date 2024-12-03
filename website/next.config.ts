import { NextConfig } from 'next';

const CONTENT_ENCODING_BROTLI = {
    key: 'Content-Encoding',
    value: 'br',
};

const CONTENT_TYPE_JS = {
    key: 'Content-Type',
    value: 'application/javascript',
};

const CONTENT_TYPE_WASM = {
    key: 'Content-Type',
    value: 'application/wasm',
};

const nextConfig: NextConfig = {
    experimental: {
        turbo: {
            // ...
        },
    },
    async headers() {
        return [
            {
                source: '/(.*)\\.data\\.br',
                headers: [CONTENT_ENCODING_BROTLI],
            },
            {
                source: '/(.*)\\.framework\\.js\\.br',
                headers: [CONTENT_ENCODING_BROTLI, CONTENT_TYPE_JS],
            },
            {
                source: '/(.*)\\.wasm\\.br',
                headers: [CONTENT_ENCODING_BROTLI, CONTENT_TYPE_WASM],
            },
        ];
    },
};

export default nextConfig;
