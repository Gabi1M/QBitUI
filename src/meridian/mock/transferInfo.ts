import { ConnectionStatus, TransferInfo } from 'meridian/models';

export const MockTransferInfo: TransferInfo = {
    connection_status: ConnectionStatus.CONNECTED,
    dl_info_speed: 10000,
    dl_info_data: 200000,
    up_info_speed: 10000,
    up_info_data: 200000,
    dl_rate_limit: 4000,
    up_rate_limit: 4000,
    dht_nodes: 10,
    queueing: false,
    use_alt_speed_limits: false,
    refresh_interval: 5,
};
