//Validate Columns
const validateCols = row => {
    if (!Number.isInteger(Number(row[0]))) {
        return "Id should be an integer"
    } else if (!row[1]) {
        return "Invalid name!"
    } else if (!row[2]) {
        return "Date is empty!"
    } else if (!Number.isInteger(Number(row[3]))) {
        return "Steps should be an integer"
    } else if (!row[4]) {
        return "Calories is empty!"
    }
}
//Validate rows
const validateRows = (csvData) => {
    const dataLength = csvData.length;
    for (let i = 0; i < dataLength; i++) {
        let rowError = validateCols(csvData[i]);
        if (rowError) {
            return `${rowError} on line number ${i}`;
        }

    }
}

module.exports = validateRows;