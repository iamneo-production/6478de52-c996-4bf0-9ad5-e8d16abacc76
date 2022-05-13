import axios from 'axios'

function validateFields(values){
    console.log(values)
    let res = {
        status : true,
        error: ''
    };
    
    let emailRegex = values.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    let phnRegex = values.mobileno.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
    if(!emailRegex){
        res.error = "Invalid Email"
        return res
    }
    if(!phnRegex){
        res.error ='Invalid Phone No.'
        return res
    }

    res  = {
        status : false,
        error: ''
    }

    return res
}

function saveUser(details){

    console.log("Saving User")

    const ApiClient = axios.create({
        baseURL: 'https://8080-dccdbfcccfcbdcebaeffacefbcaeebfacaee.examlyiopb.examly.io'
    });

    ApiClient.post('/user/signup', {
                "email": "test@gmail.com",
                "password": "test",
                "username": "test",
                "mobileNumber": "0123456789"
            }).then(response => {
      if (response.data) {
          console.log(response.data)
      }
    });


    // fetch('http://localhost:8080/user/signup', {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Accept': '*/*',
    //         'Access-Control-Allow-Origin': 'http://localhost:8080'
    //     },
    //     body: JSON.stringify({
    //         "email": "test@gmail.com",
    //         "password": "test",
    //         "username": "test",
    //         "mobileNumber": "0123456789"
    //     }),
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))

    // axios.post('http://localhost:8080/user/signup', {
    //     email: "test@gmail.com",
    //     password: "test",
    //     username: "test",
    //     mobileNumber: "0123456789"
    // })
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
}

export { validateFields, saveUser }