import { ApiClient } from '../Utils/ApiClient';

async function validateUser(email, password) {
    var res = {
        status : false
    }

    const data = {
        email: email,
        password: password
    }

    await ApiClient.post('/login', data)
    .then(response => {
        if(response.data){
            res = {
                status: true,
                jwt: response.data.jwt,
                userID: response.data.userID,
                userRole: response.data.userRole
            }
        }
    });

    return res
}


export { validateUser }