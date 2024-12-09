// // Array of dayStatus options
// let dayStatusOptions = ['present', 'late'];

// // Shift start time (9 AM)
// let shiftStartTime = 9;

// // Define holidays in December
// let holidays = ['2023-12-25', '2023-12-30']; // Christmas Day and Rizal Day

// console.log("INSERT INTO daysession (employeeID, timeIn, timeOut, dayStatus) VALUES");

// async function generateData(employeeID) {
//     let date = new Date(2023, 11, 1); // Start from December 1, 2023
//     while (date.getMonth() === 11) { // Ensure the date is in December
//         if (date.getDay() !== 0 && !holidays.includes(date.toISOString().split('T')[0])) { // Exclude Sundays and holidays
//             // Generate random time between 8 AM and 10 AM
//             let timeIn = new Date(date.getTime());
//             timeIn.setHours(8 + Math.random() * 2, Math.random() * 60, Math.random() * 60);
            
//             // There is a smaller chance that there is no timeOut
//             let timeOut = Math.random() > 0.1 ? new Date(timeIn.getTime() + Math.random() * (18 - timeIn.getHours()) * 3600000) : null;
            
//             // Choose dayStatus based on timeIn and timeOut
//             let dayStatus;
//             if (timeOut === null) {
//                 dayStatus = 'pending';
//             } else if (timeIn.getHours() >= shiftStartTime) {
//                 dayStatus = 'late';
//             } else {
//                 // Ensure at least 95% are 'present'
//                 dayStatus = Math.random() < 0.95 ? 'present' : 'late';
//             }

//             // Format as SQL insert statement
//             let sql = `(${employeeID}, '${timeIn.toISOString()}', ${timeOut ? `'${timeOut.toISOString()}'` : "NULL"}, '${dayStatus}')${employeeID < 53 && date.getDate() < 30 ? ',' : ';'}`;

//             // Log the SQL statement
//             console.log(sql);
//         }
//         date.setDate(date.getDate() + 1); // Move to the next day
//     }
//     // Wait for 5 seconds after generating records for each employee
//     await new Promise(resolve => setTimeout(resolve, 5000));
// }

// async function generateAllData() {
//     for (let employeeID = 1; employeeID <= 53; employeeID++) {
//         await generateData(employeeID);
//     }
// }

// generateAllData();
// Array of dayStatus options
let dayStatusOptions = ['present', 'late'];

// Shift start time (9 AM)
let shiftStartTime = 9;

// Define holidays in December
let holidays = ['2023-12-25', '2023-12-30']; // Christmas Day and Rizal Day

console.log("INSERT INTO daysession (employeeID, timeIn, timeOut, dayStatus) VALUES");

async function generateData(employeeID) {
    let date = new Date(2023, 11, 1); // Start from December 1, 2023
    let today = new Date(); // Today's date
    while (date < today && date.getMonth() === 11) { // Ensure the date is in December and before today
        if (date.getDay() !== 0 && !holidays.includes(date.toISOString().split('T')[0])) { // Exclude Sundays and holidays
            // Generate random time between 8 AM and 10 AM
            let timeIn = new Date(date.getTime());
            timeIn.setHours(8 + Math.random() * 2, Math.random() * 60, Math.random() * 60);
            
            // There is a smaller chance that there is no timeOut
            let timeOut = Math.random() > 0.1 ? new Date(timeIn.getTime() + Math.random() * (18 - timeIn.getHours()) * 3600000) : null;
            
            // Choose dayStatus based on timeIn and timeOut
            let dayStatus;
            if (timeOut === null) {
                dayStatus = 'pending';
            } else if (timeIn.getHours() >= shiftStartTime) {
                dayStatus = 'late';
            } else {
                // Ensure at least 95% are 'present'
                dayStatus = Math.random() < 0.95 ? 'present' : 'late';
            }

            // Format as SQL insert statement
            let sql = `(${employeeID}, '${timeIn.toISOString()}', ${timeOut ? `'${timeOut.toISOString()}'` : "NULL"}, '${dayStatus}')${employeeID < 53 && date.getDate() < 30 ? ',' : ';'}`;

            // Log the SQL statement
            console.log(sql);
        }
        date.setDate(date.getDate() + 1); // Move to the next day
    }
    await new Promise(resolve => setTimeout(resolve, 10000));
}

async function generateAllData() {
    for (let employeeID = 1; employeeID <= 53; employeeID++) {
        await generateData(employeeID);
    }
}

generateAllData();