import { ApiClient } from '../../Utils/ApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

var jwt

async function editUser(userDetails) {
    
    await AsyncStorage.getItem('jwt').then(response => {
        jwt = response
    })

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