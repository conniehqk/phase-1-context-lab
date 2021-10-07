/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const createEmployeeRecord = function(record) {
    return {
        'firstName':record[0],
        'familyName':record[1],
        'title':record[2],
        'payPerHour':record[3],
        'timeInEvents':[],
        'timeOutEvents':[]
    }
}

const createEmployeeRecords = function(records) {
    return records.map(record=>createEmployeeRecord(record))
}

const createTimeInEvent = function(date) {
    this.timeInEvents.push({
        'type':'TimeIn',
        'hour':parseInt(date.substring(11)),
        'date':date.substring(0,10)
    })
    return this
}

const createTimeOutEvent = function(date) {
    this.timeOutEvents.push({
        'type':'TimeOut',
        'hour':parseInt(date.substring(11)),
        'date':date.substring(0,10)
    })
    return this
}

const hoursWorkedOnDate = function(date1) {
    let timeIn = this.timeInEvents.find(element=>element['date']==date1)
    let timeOut = this.timeOutEvents.find(element=>element['date']==date1)
    return (timeOut['hour']-timeIn['hour'])/100
}

const wagesEarnedOnDate = function(date) {
    return this.payPerHour*hoursWorkedOnDate.call(this,date)
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    for (let i = 0; i < srcArray.length; i++) {
        if (srcArray[i]['firstName']==firstName) {
            return srcArray[i]
        }
    }
    return undefined
}

const calculatePayroll = function(arr) {
    let res = 0
    for (let i = 0; i < arr.length; i++) {
        res+=allWagesFor.call(arr[i])
    }
    return res
}
