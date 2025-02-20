'use client'
import React, { useState } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

import { useAuth } from '@/hooks/auth'
import AuthCard from '@/components/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthSessionStatus from '@/components/AuthSessionStatus'

interface FormValues {
  email: string
}

const ForgotPasswordPage = () => {
  const [status, setStatus] = useState<string>('')

  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('البريد الإلكتروني غير صالح.')
      .required('البريد الإلكتروني مطلوب.'),
  })

  const submitForm = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>,
  ): Promise<any> => {
    try {
      const response = await forgotPassword(values)

      setStatus(response.data.status)
    } catch (error: Error | AxiosError | any) {
      setStatus('')
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center  bg-black'>
      <div className='w-1/2 h-[70%] flex flex-col space-y-2  p-4 shadow-xl rounded-lg bg-red-900'>

      <div className="m-2 text-sm text-white">
        نسيت كلمة المرور ؟ لا مشكلة فقط أملئ الحقل أدناه و سنرسل إليك رابطا لتملئ كلمة مرورا جديدة .
        {/* Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one. */}
      </div>

      <AuthSessionStatus className="mb-4" status={status} />

      <Formik
        onSubmit={submitForm}
        validationSchema={ForgotPasswordSchema}
        initialValues={{ email: '' }}>
        <Form className="space-y-4 m-2">
          <div className='flex flex-col space-y-3 w-full'>
            <label
              htmlFor="email"
              className="undefined block font-medium text-sm text-white">
              البريد الإلكتروني.
            </label>

            <Field
              id="email"
              name="email"
              type="email"
              placeholder="البريد الإلكتروني"
              className="p-3 border border-red-800 bg-black text-white rounded-lg w-full pl-12 focus:outline-none focus:ring-2 focus:ring-red-500"

            />

            <ErrorMessage
              name="email"
              component="span"
              className="text-xs text-white"
            />
          </div>

          <div className="flex items-center justify-start mt-4w-full">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-red-600 border border-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all">

              تم
            </button>
          </div>
        </Form>
      </Formik>
    </div>
              </div>
  )
}

export default ForgotPasswordPage
