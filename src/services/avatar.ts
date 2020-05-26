import Identicon from 'identicon.js';
import { createHash, randomBytes } from 'crypto';

interface Params {
    data: any;
}

export const defaultIcon = ({
    data,
}: Params): string => {
    const hash = createHash('sha256').update(data).digest('hex');
    return 'data:image/png;charset=utf-8;base64,' + new Identicon(hash).toString();
}

export const randomIcon = (): string => {
    const hash = randomBytes(256).toString('hex');
    return 'data:image/png;charset=utf-8;base64,' + new Identicon(hash).toString();
}
