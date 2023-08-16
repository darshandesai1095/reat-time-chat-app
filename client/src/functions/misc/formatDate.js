import { format, parseISO, isValid } from 'date-fns';

const formatDate = ( inputDate, onlyTime=false ) => {

    let parsedDate

    if (typeof inputDate === 'string') {
        parsedDate = parseISO(inputDate)
    } else if (typeof inputDate === 'number') {
        parsedDate = new Date(inputDate)
    }

    if (isValid(parsedDate) && onlyTime) {
        return format(parsedDate, 'HH:mm')
    } else if (isValid(parsedDate)) {
        return format(parsedDate, 'dd MMM yy · HH:mm')
    } else {
        return 'HH:mm'
    }
}

export default formatDate