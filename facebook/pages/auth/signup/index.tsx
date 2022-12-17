import React, { useContext, useState } from 'react'
import styles from './style.module.css'
import Facebook from '../../../assets/facebook.svg'
import EyeOn from '../../../assets/EyeOn.svg'
import EyeOff from '../../../assets/EyeOff.svg'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { date, object, string } from "yup";
import { Error } from '../../../types/Auth';
import Router from "next/router";
import { AuthContext } from '../../../context/AuthContext';

const schema = object({
  name: string().required('Campo Obrigatório').min(2, 'Minimo 2 caracteres'),
  email: string().required('Campo Obrigatório').email('E-mail inválido').min(2, 'Minimo 2 caracteres'),
  password: string().required('Campo Obrigatório').min(2, 'Minimo 2 caracteres')
})

export const signin = () => {
  const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const { signUp } = useContext(AuthContext)

  const handleSignin = async ({name, email, password}: any) => {
    setLoading(true)
    setError(null)

    if(name && email && password) {
      const json = await signUp({name, email, password})

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

          <p>Criar uma nova conta</p>

          <form onSubmit={handleSubmit(handleSignin)} action="">

            <div className={styles.inputArea} style={{borderColor: errors?.name ? 'red' : '#dddfe2'}} >
              <input {...register('name', {minLength: 2})} type="text" placeholder='Nome Completo' />
            </div>

            <div className={styles.error}>  
              {errors?.name?.message as string}
            </div>

            <div className={styles.inputArea} style={{borderColor: error?.email || errors?.email ? 'red' : '#dddfe2'}}>
              <input {...register('email')} type="text" placeholder='Email' />
            </div>

            <div className={styles.error}>  
              {errors?.email?.message as string}
              {error?.email?.msg as string}
            </div>
            
            <div className={styles.inputArea} style={{borderColor: errors?.password ? 'red' : '#dddfe2'}}>
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
            </div>


            <div className={styles.error}>
              {errors?.birthdate?.message as string}
            </div>


            


            <button disabled={loading} type="submit">Cadastrar-se</button>

            <div onClick={() => Router.push('/auth/signin') } style={{color: '#18a4f7', marginTop: '5px', cursor: 'pointer'}}>
              Já tem uma conta ?
            </div>
          </form>


        </div>
      </div>
    </div>
  )
}

export default signin
