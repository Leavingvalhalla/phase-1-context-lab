function createEmployeeRecord(array) {
  this.firstName = array[0];
  this.familyName = array[1];
  this.title = array[2];
  this.payPerHour = array[3];
  this.timeInEvents = [];
  this.timeOutEvents = [];
}

function createEmployeeRecords(array) {
  const ans = array.map((employee) =>
    createEmployeeRecord.call(this, employee)
  );
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

const testEmployee = ['Zaphod', 'Beeblebrox', 'President', '1000'];
