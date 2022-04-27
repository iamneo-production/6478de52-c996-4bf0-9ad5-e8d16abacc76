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

export { validateFields }