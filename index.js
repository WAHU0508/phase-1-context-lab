/* Your Code Here */
// Function to create an employee record
const createEmployeeRecord = function (employeeRecord) {
    return {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title: employeeRecord[2],
        payPerHour: employeeRecord[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

// Function to create multiple employee records
const createEmployeeRecords = function (employeeRecords) {
    return employeeRecords.map(createEmployeeRecord);
};

// Define methods separately
const createTimeInEvent = function (timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

const createTimeOutEvent = function (timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

const hoursWorkedOnDate = function (date) {
    let timeIn = this.timeInEvents.find(e => e.date === date);
    let timeOut = this.timeOutEvents.find(e => e.date === date);
    if (!timeIn) { throw new Error(`No timeIn event found for date: ${date}`); }
    if (!timeOut) { throw new Error(`No timeOut event found for date: ${date}`); }

    const timeInDate = timeIn.hour;
    const timeOutDate = timeOut.hour;

    const hoursWorked = (timeOutDate - timeInDate) / 100;
    if (hoursWorked < 0) throw new Error(`Invalid time range for date: ${date}`);
    return hoursWorked;
};

const wagesEarnedOnDate = function (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
};

const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor.call(employee);
    }, 0);
};

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
    return srcArray.find(employee => employee.firstName === firstName);
}

let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
let date1 = "2014-02-28 1400";
let date2 = "2014-02-28 1700";

// Use `call` to ensure the correct context
createTimeInEvent.call(bpRecord, date1);
createTimeOutEvent.call(bpRecord, date2);

let hoursWorked = hoursWorkedOnDate.call(bpRecord, "2014-02-28");
let wagesEarned = wagesEarnedOnDate.call(bpRecord, "2014-02-28");
let totalWages = allWagesFor.call(bpRecord);

console.log(hoursWorked); 
console.log(wagesEarned);   
console.log(totalWages);  

