export const initialState = {
    user: null,
    userType: null,
    jwt: ''
};
  
export const actionTypes = {
    SET_USER: "SET_USER",
    SET_JWT: "SET_JWT"
};
  
const reducer = (state, action) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state, 
                user: action.user,
                userType: action.userType,
            };
        case actionTypes.SET_JWT:
            console.log(action.jwt);
            return {
                ...state, 
                jwt: action.jwt,
            };
        default: 
            return state;
    }
}
  
export default reducer;