export type signinData = {
    email: string,
    password: string
}

export type signupData = {
    name: string
    email: string,
    password: string,
}

export type Error = {
    email?: {
        msg: string
    },
    
    
}