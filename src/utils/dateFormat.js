import { formatISO } from 'date-fns';

// 'YYYY-MM-DD' format
function formatDate(isoString) {
    return isoString
        ? formatISO(new Date(isoString), { representation: 'date' })
        : '';
}

export default formatDate;
