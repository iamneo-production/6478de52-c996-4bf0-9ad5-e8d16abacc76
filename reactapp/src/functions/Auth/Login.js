import { ApiClient } from '../Utils/ApiClient' 

function validateUser(email, password) {
    var res

    const data = {
        email: email,
        password: password
    }

    console.log(data)

    ApiClient.post('/login', data)
    .then(response => {
        if(response.data){
            console.log(response.data)
        }
    });

    // if(username === 'admin' && email === 'admin') {
    //     res = {
    //         status: true,
    //         userID: '0',
    //         userType: 'admin'
    //     }
    // }else if(username === 'organizer' && email === 'organizer'){
    //     res = {
    //         status: true,
    //         userID: '2',
    //         userType: 'organizer'
    //     }
    // }else{
    //     res = {
    //         status: true,
    //         userID: '1',
    //         userType: 'user'
    //     }
    // }
    return res
}


export { validateUser }