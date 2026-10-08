const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const recordsFile = path.join(__dirname, "../data/records.xml");

async function getRecords() {
    const xmlData = fs.readFileSync(recordsFile, "utf-8");

    const result = await xml2js.parseStringPromise(xmlData);

    return result.records.record.map(record => ({
        id: record.id[0],
        name: record.name[0],
        department: record.department[0],
        status: record.status[0],
        owner: record.owner[0]
    }));
}

async function getRecordsForUser(userId, role) {
    const records = await getRecords();

    // Admin can see every record
    if (role === "Admin") {
        return records;
    }

    // General users can only see their own records
    return records.filter(record => record.owner === userId);
}

module.exports = {
    getRecordsForUser
};