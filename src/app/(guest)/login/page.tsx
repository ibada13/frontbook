'use client'
import Link from 'next/link'
import * as Yup from 'yup'
import { useSearchParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

import { useAuth } from '@/hooks/auth'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import { useEffect, useState } from 'react'
import AuthSessionStatus from '@/components/AuthSessionStatus'

interface Values {
  email: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string>('')

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/books/1',
  })

  useEffect(() => {
    const resetToken = searchParams.get('reset')
    setStatus(resetToken ? atob(resetToken) : '')
  }, [searchParams])

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ): Promise<any> => {
    try {
      await login(values)
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
      setStatus('')
    }
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('البريد الإلكتروني غير صالح.')
      .required('البريد الإلكتروني مطلوب.'),
    password: Yup.string().required('كلمة السر مطلوبة.'),
  })

  return (

    <div className='w-full min-h-screen p-8 bg-black flex justify-center items-center'>

      <Formik
        onSubmit={submitForm}
        validationSchema={LoginSchema}
        initialValues={{ email: '', password: '', remember: false }}>
        <Form className="w-[40%] flex gap-y-5 bg-red-900 p-8 rounded-lg shadow-lg flex-col min-h-[70vh] items-center">
          <p className='text-3xl text-white font-bold  '>تسجيل الدخول</p>
          <div className='flex flex-col w-full space-y-2'>
          <label htmlFor="email" className="text-lg font-medium text-white">
          البريد الإلكتروني                </label>

            <Field
              id="email"
              name="email"
              type="email"
              className="p-3 border border-red-800 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"

            />

            <ErrorMessage
              name="email"
              component="span"
              className="text-xs text-white"
            />
          </div>

          <div className="flex flex-col w-full space-y-2">
          <label htmlFor="password" className="text-lg font-medium text-white">
                        كلمة المرور
                    </label>

            <Field
              id="password"
              name="password"
              type="password"
              className="p-3 border border-red-800 bg-black text-white rounded-lg w-full pl-12 focus:outline-none focus:ring-2 focus:ring-red-500"

              />

            <ErrorMessage
              name="password"
              component="span"
              className="text-xs text-white"
            />
          </div>

          <div className="flex items-start justify-start bg-pink-300 self-start">
            <label htmlFor="remember" className="ml-2 text-[#252729] text-sm leading-[150%] tracking-[-0.4px] font-medium">
                تذكرني
              {/* <span >
              </span> */}
              </label>
              <Field
                type="checkbox"
                name="remember"
                className="rounded border-[#99A6AE] text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />

          </div>

          <div className="flex flex-col w-full items-center justify-end mt-2 space-y-2">

          <Link href="/forgot-password" className="self-start  underline  hover:text-white font-semibold "  >هل نسيت كلمة المرور ؟ </Link>


            <button
              type="submit"
              className="ml-3  inline-flex items-center px-4 py-4 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
              تسجيل الدخول
            </button>
          </div>
        </Form>
      </Formik>

              </div>
  )
}

export default LoginPage
