'use client'
import Link from 'next/link'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

import { useAuth } from '@/hooks/auth'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'

interface Values {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const RegisterPage = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ): Promise<any> => {
    try {
      await register(values)
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('إسم المستخدم مطلوب.'),
    email: Yup.string()
      .email('البريد الإلكتروني غير صالج.')
      .required('البريد الإلكتروني مطلوب.'),
    password: Yup.string().required('كلمة المرور مطلوبة.'),
    password_confirmation: Yup.string()
      .required('من فضلك أكد كلمة المرور.')
      .oneOf([Yup.ref('password')], 'كلمتي المرور غير متطابقتين.'),
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">

      <Formik
        onSubmit={submitForm}
        validationSchema={RegisterSchema}
        initialValues={{
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }}>
      <Form className="w-1/2 flex gap-y-5 bg-red-900 p-8 rounded-lg shadow-lg flex-col min-h-[70vh] items-center">
        <p className='text-white text-3xl font-bold'>التسجيل</p>
        <div className='flex flex-col space-y-1 w-full'>

          <label htmlFor="username" className="text-lg font-medium text-white">
          إسم المستخدم               </label>

            <Field
              id="name"
              name="name"
              className="p-3 border border-red-800 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"

            />

            <ErrorMessage
              name="name"
              component="span"
              className="text-xs text-white"
            />
          </div>

          <div className='flex flex-col space-y-1 w-full'>
          <label htmlFor="email" className="text-lg font-medium text-white">
              البريد الإلكتروني
            </label>

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

          <div className='flex flex-col space-y-1 w-full'>

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

          <div className='flex flex-col space-y-1 w-full'>

          <label htmlFor="password" className="text-lg font-medium text-white">
                    تأكيد كلمة المرور 
                    </label>

            <Field
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              className="p-3 border border-red-800 bg-black text-white rounded-lg w-full pl-12 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <ErrorMessage
              name="password_confirmation"
              component="span"
              className="text-xs text-white"
            />
          </div>

          <div className="flex flex-col space-y-2 items-center justify-end mt-4 w-full">
            <Link
              href="/login"
              className="self-start underline underline-offset-2 text-black font-bold hover:text-white transition-colors duration-300">
              لدي حساب بالفعل!
            </Link>

            <button
              type="submit"
              className="px-6 py-3 bg-black text-red-600 border border-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all duration-300">

              التسجيل
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterPage
