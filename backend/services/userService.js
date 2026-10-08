const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const usersFile = path.join(__dirname, "../data/users.xml");

async function getUsers() {
    const xmlData = fs.readFileSync(usersFile, "utf-8");

    const result = await xml2js.parseStringPromise(xmlData);

    return result.users.user.map(user => ({
        id: user.id[0],
        userId: user.userId[0],
        password: user.password[0],
        name: user.name[0],
        email: user.email[0],
        role: user.role[0]
    }));
}

async function authenticateUser(userId, password, role) {
    const users = await getUsers();

    return users.find(
        user =>
            user.userId === userId &&
            user.password === password &&
            user.role === role
    );
}


// ADD USER
async function addUser(user) {
    const users = await getUsers();

    const newUser = {
        id: user.id || `U${String(users.length + 1).padStart(3, "0")}`,
        userId: user.userId,
        password: user.password,
        name: user.name,
        email: user.email,
        role: user.role
    };

    users.push(newUser);

    await saveUsers(users);

    return newUser;
}


// UPDATE USER
async function updateUser(id, updatedData) {
    const users = await getUsers();

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    users[index] = {
        ...users[index],
        ...updatedData,
        id: users[index].id
    };

    await saveUsers(users);

    return users[index];
}


// DELETE USER
async function deleteUser(id) {
    const users = await getUsers();

    const filteredUsers = users.filter(user => user.id !== id);

    if (filteredUsers.length === users.length) {
        return false;
    }

    await saveUsers(filteredUsers);

    return true;
}


// SAVE USERS TO XML
async function saveUsers(users) {

    const builder = new xml2js.Builder({
        rootName: "users",
        headless: false
    });

    const xmlObject = {
        user: users.map(user => ({
            id: [user.id],
            userId: [user.userId],
            password: [user.password],
            name: [user.name],
            email: [user.email],
            role: [user.role]
        }))
    };

    const xml = builder.buildObject(xmlObject);

    fs.writeFileSync(usersFile, xml, "utf-8");
}


module.exports = {
    getUsers,
    authenticateUser,
    addUser,
    updateUser,
    deleteUser
};