import UserModel from "./UserModel";

class UserHelper {

    writeToFile(filename, content) {
        //const filename = 'userInfo.json';
        cy.task('writeFileToFixtures', { filename, content });
    }

    readFromFile(filename) {
      return cy.task('readFileFromFixtures', { filename })
      .then((content) => {
        const parsedUserData = JSON.parse(content); // Parse the content into JSON
        const user = new UserModel();

        user.firstName = parsedUserData.firstName;
        user.lastName = parsedUserData.lastName;
        user.userName = parsedUserData.userName;
        user.email = parsedUserData.email;
        user.password = parsedUserData.password;

        return user; 
      }        
    )}

    /*clearFile(filename) {
      cy.task('clearFileContent', filename).then((message) => {
        cy.log(message);
    }) 
    }*/
}

export default UserHelper;