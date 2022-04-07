export enum ConnectionStatus {
    CONNECTED = 'connected',
    FIREWALED = 'firewaled',
    DISCONNECTED = 'disconnected',
}

export interface TransferInfo {
    dl_info_speed: number;
    dl_info_data: number;
    up_info_speed: number;
    up_info_data: number;
    dl_rate_limit: number;
    up_rate_limit: number;
    dht_nodes: number;
    connection_status: ConnectionStatus;
    queueing: boolean;
    use_alt_speed_limits: boolean;
    refresh_interval: number;
}
