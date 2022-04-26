export const bytesToSize = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const removeDuplicatesFromArray = <T>(array: T[]) =>
    Array.from(new Set(array));

export const truncateLongText = (text: string, maxLength = 30) =>
    text.length < maxLength ? text : `${text.slice(0, maxLength - 3)}...`;

export const calculateEtaString = (eta: number) => {
    if (eta < 60) {
        return eta.toString();
    }

    if (eta < 3600) {
        const minutes = Math.floor(eta / 60);
        const seconds = eta % 60;
        return `${minutes}:${seconds}`;
    }

    const hours = Math.floor(eta / 3600);
    const remainingMinutes = Math.floor((eta - hours * 3600) / 60);
    const remainingSeconds = eta % 60;
    return `${hours}:${remainingMinutes}:${remainingSeconds}`;
};

export const getKeyForRecordValue = <T extends string | number | symbol, Y>(
    record: Record<T, Y>,
    value: Y
) => Object.entries(record).filter(x => x[1] === value)[0][0];
