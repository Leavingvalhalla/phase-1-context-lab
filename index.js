function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  const newArray = [];
  array.map((employee) => newArray.push(createEmployeeRecord(employee)));
  return newArray;
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function createTimeInEvent(event) {
  const splitEvent = event.split(' ');
  const newEvent = {
    type: 'TimeIn',
    date: splitEvent[0],
    hour: parseInt(splitEvent[1]),
  };
  this.timeInEvents.push(newEvent);
  return this;
}

function createTimeOutEvent(event) {
  const splitEvent = event.split(' ');
  const newEvent = {
    type: 'TimeOut',
    date: splitEvent[0],
    hour: parseInt(splitEvent[1]),
  };
  this.timeOutEvents.push(newEvent);
  return this;
}

const testEmployee = ['Zaphod', 'Beeblebrox', 'President', 1000];
const employeeRecord = createEmployeeRecord(testEmployee);

createTimeInEvent.call(employeeRecord, '2044-03-14 0900');
createTimeInEvent.call(employeeRecord, '2044-03-15 0900');
createTimeOutEvent.call(employeeRecord, '2044-03-14 2100');
createTimeOutEvent.call(employeeRecord, '2044-03-15 2100');

console.log(allWagesFor.call(employeeRecord));

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((e) => e.date.split(' ')[0] == date);
  const timeOut = this.timeOutEvents.find((e) => e.date.split(' ')[0] == date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(array) {
  return array.reduce(
    (total, employee) => total + allWagesFor.call(employee),
    0
  );
}
