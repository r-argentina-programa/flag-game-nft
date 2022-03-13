/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string;
    readonly VITE_STELLAR_NETWORK: string;
    readonly VITE_STELLAR_NETWORK_PASSPHRASE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
