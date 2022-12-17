import React, { useContext, useState } from 'react'
import styles from './style.module.css'
import Facebook from '../../../assets/facebook.svg'
import EyeOn from '../../../assets/EyeOn.svg'
import EyeOff from '../../../assets/EyeOff.svg'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthContext } from '../../../context/AuthContext';
import Router from "next/router";

const schema = object({
  email: string().required('Campo Obrigatório').email('E-mail inválido'),
  password: string().required('Campo Obrigatório')
})

export const signin = () => {
  const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)

  const handleSignin = async ({email, password}: any) => {
    setLoading(true)
    setError('')

    if (email && password) {
      const json = await signIn({email, password})
      if(json?.error) {
        setError(json.error)
      }
    }

    setLoading(false)
  }
 
  return (
    <div className={styles.container}>

      <div className={styles.signinContainer}>

        {/* Logo */}
        <div className={styles.logo}>
          <Facebook width={350}  />
        </div>

        {/* Area de Registro */}
        <div className={styles.signinArea}>

          <p>Entrar no facebook</p>

          <form onSubmit={handleSubmit(handleSignin)} action="">
            <div className={styles.inputArea}>
              <input {...register('email')} type="text" placeholder='Email' />
            </div>

            <div className={styles.error}>  
              {errors?.email?.message as string}
            </div>
            
            <div className={styles.inputArea}>
              <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder='Senha' />
              <span onClick={() => setShowPassword(!showPassword)}>
                {!showPassword &&
                  <span><EyeOff  /></span>
                }
                {showPassword &&
                  <span><EyeOn  /></span>
                }
              </span>
            </div>

            <div className={styles.error}>
              {errors?.password?.message as string}
              {error as string}
            </div>


            <button disabled={loading} type="submit">Entrar</button>

            <div onClick={() => Router.push('/auth/signup') } style={{color: '#18a4f7', marginTop: '5px', cursor: 'pointer'}}>
              Não tem uma conta ?
            </div>
          </form>


        </div>
      </div>
    </div>
  )
}

export default signin
