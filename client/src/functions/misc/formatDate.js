import { format, parseISO, isValid, differenceInMinutes, 
    differenceInHours, isToday, isYesterday } from 'date-fns';

const formatDate = ( inputDate, returnFormat ) => {

    let parsedDate

    if (typeof inputDate === 'string') {
        parsedDate = parseISO(inputDate)
    } else if (typeof inputDate === 'number') {
        parsedDate = new Date(inputDate)
    }

    if ( (isValid(parsedDate) && returnFormat === "checkIsToday") ) {
        return ( isToday(parsedDate) )
    }

    if ( (isValid(parsedDate) && returnFormat === "checkIsYesterday") ) {
        return ( isYesterday(parsedDate) )
    }

    if (isValid(parsedDate) && returnFormat === "time") {
        return format(parsedDate, 'h:mm a').toLocaleLowerCase()
    }

    if (isValid(parsedDate) && returnFormat === "date") {
        return format(parsedDate, 'dd MMM yy')
    }
    
    if (isValid(parsedDate) && returnFormat === "date-time") {
        return format(parsedDate, 'dd MMM yy · HH:mm')
    }

    if (isValid(parsedDate) && returnFormat === "difference") {
        return calculateTimeDifference(parsedDate)
    }
    
    return 'HH:mm'
}

const calculateTimeDifference = (parsedDate) => {

    const now = Date.now()
    const mins = differenceInMinutes(now, parsedDate)
    const hours = differenceInHours(now, parsedDate)


    if (Number(mins) === 0) {
        return (`Now`)
    }
    if (Number(mins) === 1) {
        return (`${mins} min`)
    }
    if (hours < 1) {
        return (`${mins} mins`)
    }
    if (isYesterday(parsedDate)) {
        return ('Yesterday')
    }
    if (hours < 24) {
        return (format(parsedDate, 'h:mm a')).toLocaleLowerCase()
    }
    if (hours >= 24) {
        return (format(parsedDate, 'dd·MM·yy'))
    }

}


export default formatDate