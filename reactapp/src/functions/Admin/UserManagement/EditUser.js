import { ApiClient } from '../../Utils/ApiClient';


async function editUser(userDetails, jwt) {
    const data = {
        email : userDetails.email,
        username: userDetails.username,
        mobileNumber: userDetails.mobileNumber
    }

    await ApiClient.post('/user/edit/'+userDetails.userId, data , {
        headers: {
            'Authorization': `Bearer ${jwt}`,
        }
    }).then(response => {
        if(response.status === 200){
            return true
        }
    })
}

export { editUser }