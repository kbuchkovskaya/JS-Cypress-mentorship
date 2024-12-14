class UserHelper {

    getRandomTime = () => {
        return new Date().getTime()
    };

    getRandomUser = () => {
        return {
            firstName : `Name${this.getRandomTime()}`,
            lastName : `LastName${this.getRandomTime()}`,
            userName : `UserName${this.getRandomTime()}`,
            email: `Email${this.getRandomTime()}@example.org`,
            password : `Password${this.getRandomTime()}`
        }
    }

}

export default UserHelper