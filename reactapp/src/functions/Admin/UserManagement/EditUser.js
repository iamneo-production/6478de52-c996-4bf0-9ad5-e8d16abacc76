import { ApiClient } from '../../Utils/ApiClient';

async function editUser(userDetails) {

    const data = {
        email : userDetails.email,
        username: userDetails.username,
        mobileNumber: userDetails.mobileNumber
    }

    await ApiClient.post('/user/edit/'+userDetails.userId, data)
    .then(response => {
        if(response.status === 200){
            return true
        }
    })
}

export { editUser }