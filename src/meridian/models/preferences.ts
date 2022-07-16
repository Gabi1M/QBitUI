export type Preferences = Partial<{
    add_trackers: string;
    add_trackers_enabled: boolean;
    alt_dl_limit: number;
    alt_up_limit: number;
    alternative_webui_enabled: boolean;
    alternative_webui_path: string;
    announce_ip: string;
    announce_to_all_tiers: boolean;
    announce_to_all_trackers: boolean;
    anonymous_mode: boolean;
    async_io_threads: number;
    auto_delete_mode: number;
    auto_tmm_enabled: boolean;
    autorun_enabled: boolean;
    autorun_program: string;
    banned_IPs: string;
    bittorrent_protocol: number;
    bypass_auth_subnet_whitelist: string;
    bypass_auth_subnet_whitelist_enabled: boolean;
    bypass_local_auth: boolean;
    category_changed_tmm_enabled: boolean;
    checking_memory_use: number;
    create_subfolder_enabled: boolean;
    current_interface_address: string;
    current_network_interface: string;
    dht: boolean;
    disk_cache: number;
    disk_cache_ttl: number;
    dl_limit: number;
    dont_count_slow_torrents: boolean;
    dyndns_domain: string;
    dyndns_enabled: boolean;
    dyndns_password: string;
    dyndns_service: number;
    dyndns_username: string;
    embedded_tracker_port: number;
    enable_coalesce_read_write: boolean;
    enable_embedded_tracker: boolean;
    enable_multi_connections_from_same_ip: boolean;
    enable_os_cache: boolean;
    enable_piece_extent_affinity: boolean;
    enable_upload_suggestions: boolean;
    encryption: number;
    export_dir: string;
    export_dir_fin: string;
    file_pool_size: number;
    incomplete_files_ext: boolean;
    ip_filter_enabled: boolean;
    ip_filter_path: string;
    ip_filter_trackers: boolean;
    limit_lan_peers: boolean;
    limit_tcp_overhead: boolean;
    limit_utp_rate: boolean;
    listen_port: number;
    locale: string;
    lsd: boolean;
    mail_notification_auth_enabled: boolean;
    mail_notification_email: string;
    mail_notification_enabled: boolean;
    mail_notification_password: string;
    mail_notification_sender: string;
    mail_notification_smtp: string;
    mail_notification_ssl_enabled: boolean;
    mail_notification_username: string;
    max_active_downloads: number;
    max_active_torrents: number;
    max_active_uploads: number;
    max_connec: number;
    max_connec_per_torrent: number;
    max_ratio: number;
    max_ratio_act: number;
    max_ratio_enabled: boolean;
    max_seeding_time: number;
    max_seeding_time_enabled: boolean;
    max_uploads: number;
    max_uploads_per_torrent: number;
    outgoing_ports_max: number;
    outgoing_ports_min: number;
    pex: boolean;
    preallocate_all: boolean;
    proxy_auth_enabled: boolean;
    proxy_ip: string;
    proxy_password: string;
    proxy_peer_connections: boolean;
    proxy_port: number;
    proxy_torrents_only: boolean;
    proxy_type: number;
    proxy_username: string;
    queueing_enabled: boolean;
    random_port: boolean;
    recheck_completed_torrents: boolean;
    resolve_peer_countries: boolean;
    rss_auto_downloading_enabled: boolean;
    rss_download_repack_proper_episodes: boolean;
    rss_max_articles_per_feed: number;
    rss_processing_enabled: boolean;
    rss_refresh_interval: number;
    rss_smart_episode_filters: string;
    save_path: string;
    save_path_changed_tmm_enabled: boolean;
    save_resume_data_interval: number;
    scan_dirs: { [key: string]: number };
    schedule_from_hour: number;
    schedule_from_min: number;
    schedule_to_hour: number;
    schedule_to_min: number;
    scheduler_days: number;
    scheduler_enabled: boolean;
    send_buffer_low_watermark: number;
    send_buffer_watermark: number;
    send_buffer_watermark_factor: number;
    slow_torrent_dl_rate_threshold: number;
    slow_torrent_inactive_timer: number;
    slow_torrent_ul_rate_threshold: number;
    socket_backlog_size: number;
    start_paused_enabled: boolean;
    stop_tracker_timeout: number;
    temp_path: string;
    temp_path_enabled: boolean;
    torrent_changed_tmm_enabled: boolean;
    up_limit: number;
    upload_choking_algorithm: number;
    upload_slots_behavior: number;
    upnp: boolean;
    use_https: boolean;
    utp_tcp_mixed_mode: number;
    web_ui_address: string;
    web_ui_ban_duration: number;
    web_ui_clickjacking_protection_enabled: boolean;
    web_ui_csrf_protection_enabled: boolean;
    web_ui_custom_http_headers: string;
    web_ui_domain_list: string;
    web_ui_host_header_validation_enabled: boolean;
    web_ui_https_cert_path: string;
    web_ui_https_key_path: string;
    web_ui_max_auth_fail_count: number;
    web_ui_port: number;
    web_ui_secure_cookie_enabled: boolean;
    web_ui_session_timeout: number;
    web_ui_upnp: boolean;
    web_ui_use_custom_http_headers_enabled: boolean;
    web_ui_username: string;
    web_ui_password: string;
}>;

export const BittorrentProtocolNameMapping: Record<number, string> = {
    0: 'TCP and μTP',
    1: 'TCP',
    2: 'μTP',
};

export const ProxyTypeNameMapping: Record<number, string> = {
    0: 'None',
    1: 'HTTP proxy without authentication',
    2: 'SOCKS5 proxy without authentication',
    3: 'HTTP proxy with authentication',
    4: 'SOCKS5 proxy with authentication',
    5: 'SOCKS4 proxy without authentication',
};

export const SchedulerDayNameMapping: Record<number, string> = {
    0: 'Every day',
    1: 'Every weekday',
    2: 'Every weekend',
    3: 'Every Monday',
    4: 'Every Tuesday',
    5: 'Every Wednesday',
    6: 'Every Thursday',
    7: 'Every Friday',
    8: 'Every Saturday',
    9: 'Every Sunday',
};

export const TorrentManagementModeNameMapping: Record<number, string> = {
    1: 'Automatic',
    0: 'Manual',
};

export const TorrentManagementCategoryChangedNameMapping: Record<number, string> = {
    1: 'Relocate torrent',
    0: 'Switch torrent to manual mode',
};

export const TorrentManagementPathChangedNameMapping: Record<number, string> = {
    1: 'Relocate affected torrents',
    0: 'Switch affected torrents to manual mode',
};

export const BitTorrentEncryptionNameMapping: Record<number, string> = {
    0: 'Prefer encryption',
    1: 'Force encryption on',
    2: 'Force encryption off',
};

export const BitTorrentMaxRatioActNameMaping: Record<number, string> = {
    0: 'Pause torrent',
    1: 'Remove torrent',
    2: 'Remove torrent and its files',
    3: 'Enable super seeding for torrent',
};
