import { ApiClient } from '../../Utils/ApiClient';

async function fetchUsers() {
    var users = []

    await ApiClient.get('/user')
    .then(response => {
        if (response.data) {
            users = response.data
            return users
        }
    })
    .catch(error => {
        console.log(error)
    })

    return users
}


async function deleteUser(userID) {
    await ApiClient.post('/user/delete/'+userID)
    .then(response => {
        if(response.status === 200){
            return true
        }
    })
}

export { fetchUsers, deleteUser }