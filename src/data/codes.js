const codes = {

    Error:{
        Login:{
            generic: {
                message: 'Login Error.',
                code: 'NA_LOGIN'
            },
            invalidCredential: {
                message: 'Invalid Login Information.',
                code: 'ILI_LOGIN'
            }
        },
        UserRegistration: {
            generic: {
                message: 'Error Registering User',
                code: 'NA_UREG'
            },
            usernameInUse:{
                message: 'Username already in use.',
                code: 'UNU_UREG'
            },
            emailInUse:{
                message: 'An account with this email address already exists.',
                code: 'EMU_UREG'
            },
            invalidUsername: {
                message: 'Must contain only letters, numbers and underscore(_).',
                code: 'IUN_UREG'
            },
            invalidEmail:{
                message: 'Username already in use.',
                code: 'IEM_UREG'
            },
            invalidPassword: {
                message: 'Invalid Account Password. See Below for password requirments.',
                code: 'IPW_UREG'
            },
            emailTooLong: {
                message: 'Email address must be less than 256 characters long.',
                code: 'ETL_UREG'
            },
            usernameTooLong: {
                message: 'Username must be less than 33 characters long.',
                code: 'UTL_UREG'
            },
            emailNotValidated: {
                message: 'Visit the link in the Registration email to finish registering this account.',
                code: 'ENV_UREG'
            }
        }
    },
    Generic:{
        message: 'Internal Error.',
        code: 'IER_GNR'
    }
}

export const getCode = (code, codesObject = codes) => {

    for(var key in codesObject){

        if(typeof codesObject[key] === 'object' && !Array.isArray(codesObject[key])){

            if(codesObject[key].code === code)
                return codesObject[key];

            let recursiveSearch = getCode(code, codesObject[key]);
            if(recursiveSearch) return recursiveSearch;
        }
    }
    return null;
}

export default codes
