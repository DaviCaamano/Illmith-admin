const initialState = {
    username: '',
    email: '',
}

export const login = (email, username) => {

    return {
        type: 'USER_LOGIN',
        payload: {email, username}
    }

};

export const logout = () => {

    return {
        type: 'USER_LOGIN',
        payload: {}
    }
}

export const flagAdmin = () => {

    return { type: 'FLAG_ADMIN' }
}


const reducer = (state = initialState, action) => {

    switch(action.type){
        case 'USER_LOGIN':
            const {email, username} = action.payload;
            return {
                email: email? email: null,
                username: username? username: null
            }
        case 'FLAG_ADMIN':
            return {
                ...state,
                admin: true
            }
        default: return state;
    }
}
export default reducer;
