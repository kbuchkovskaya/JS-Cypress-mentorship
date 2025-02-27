class UserModel {

   constructor() {
        const getUnixTime = new Date().getTime();
        this.firstName = `Name${getUnixTime}`;
        this.lastName = `LastName${getUnixTime}`;
        this.userName = `UserName${getUnixTime}`;
        this.email = `Email${getUnixTime}@example.com`;
        this.password = `Password${getUnixTime}`
    }
}

export default UserModel