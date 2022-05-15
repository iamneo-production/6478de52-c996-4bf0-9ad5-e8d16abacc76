import { ApiClient } from '../../Utils/ApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

var jwt

async function fetchUsers() {
    var users = []

    AsyncStorage.getItem('jwt').then(response => {
        jwt = response
    })

    await ApiClient.get('/user', {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    })
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
    await ApiClient.delete('/user/delete/'+userID, {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }).then(response => {
        if(response.status === 200){
            return true
        }
    })
}

export { fetchUsers, deleteUser }