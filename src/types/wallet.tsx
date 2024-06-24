export interface walletProfile {
    _id: string;
    username: string;
    wallet_address: string;
    balance: number;
    energy: number;
    tap: number;
    limit: number;
    treasure_date: Date;
}
export interface walletStateProps {
    user: walletProfile;
    users: walletProfile[];
    friend: boolean;
    error: object | string | null;
}