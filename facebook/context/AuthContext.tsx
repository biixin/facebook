import React, { createContext, useState, useEffect } from "react";
import api from "../libs/api";
import Cookies from 'js-cookie'
import nookies, { parseCookies } from 'nookies'
import Router from "next/router";
import axios from 'axios';
import { User } from "../types/User";
import { UserSocial } from "../types/UserSocial";
import { signupData } from "../types/Auth";
import { SignInData, SignUpData } from "./types";


type AuthContextType = {
    isAuthenticated: boolean,
    user: User | null,
    signIn: (data: SignInData) => Promise<any>,
    signUp: (data: signupData) => Promise<any>
    logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user;

    useEffect(() => {
        const cookies = parseCookies()
        const token = cookies['token']

        if (token) {
            const request = async () => {
                let json = await api.Request(token)
                if (json) setUser(json.user)
                if (json.code) {
                    Router.push('/auth/signin')
                }
                
            }
            request()
        }
    }, [])


    async function signIn({ email, password }: SignInData) {
        const json = await api.Signin(email, password)

        if (json.error) {
            return json
        }

        Cookies.set('token', json.token, { expires: 7 })
        setUser(json.user)
        Router.push('/')
    }

    async function signUp({ name, email, password }: SignUpData) {
        const json = await api.Signup(name, email, password)

        if (json.error) {
            return json
        }

        Cookies.set('token', json.token, { expires: 7 })
        setUser(json.user)
        Router.push('/')
    }

    async function logout() {
        setUser(null)
        nookies.destroy(null, 'token')
        Router.push('/auth/signin')
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    )
}