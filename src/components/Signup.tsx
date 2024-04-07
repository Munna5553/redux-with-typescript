import { Formik } from "formik"
import Input from "./Input"
import { signUpSchema } from "./user.schema"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../Features/hook"
import { registerUser } from "../Features/auth/authActions"
import { AiOutlineUser } from "react-icons/ai"
import { BiEnvelope } from "react-icons/bi"
import { PiEyeBold, PiEyeClosed } from "react-icons/pi"
import { RiKey2Line } from "react-icons/ri"


const Signup = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch()

    const { success, loading } = useAppSelector(state => state.auth)

    const navigate = useNavigate()

    if (success) {
        navigate("/")
    }

    return (
        <div className="flex items-center justify-center h-screen overflow-hidden">
            <Formik
                initialValues={{ fullname: "", email: "", password: "" }}
                validationSchema={signUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(registerUser(values))
                    setSubmitting(false);
                }}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <div className="w-[20rem] flex flex-col items-center gap-4">
                        <h1 className="text-4xl font-semibold capitalize text-center mb-4">
                            join us today
                        </h1>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                            <div>
                                <Input
                                    type="text"
                                    name="fullname"
                                    placeholder="Full name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullname}
                                    className={`pl-9 pr-4`}
                                    startIcon={<AiOutlineUser />}
                                    autoComplete="off"
                                />
                                <p className="text-xs font-normal text-red-400 mt-1">
                                    {errors.fullname && touched.fullname && errors.fullname}
                                </p>
                            </div>

                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={`pl-9 pr-4`}
                                    startIcon={<BiEnvelope />}
                                    autoComplete="off"
                                />
                                <p className="text-xs font-normal text-red-400 mt-1">
                                    {errors.email && touched.email && errors.email}
                                </p>
                            </div>

                            <div>
                                <Input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className={`pl-9 pr-9`}
                                    startIcon={<RiKey2Line />}
                                    autoComplete="off"
                                    endIcon={
                                        visible ? <PiEyeBold onClick={() => setVisible(!visible)} /> : <PiEyeClosed onClick={() => setVisible(!visible)} />
                                    }
                                />
                                <p className="text-xs font-normal text-red-400 mt-1">
                                    {errors.password && touched.password && errors.password}
                                </p>
                            </div>

                            <button type="submit" className="inline-flex items-center justify-center px-4 font-medium text-lg py-2 text-white rounded-md bg-blue-800" disabled={isSubmitting}>
                                {loading ? "..." : "Sign up"}
                            </button>

                        </form>
                        <h2 className="text-gray-400 flex gap-2 items-center text-base font-normal">Already have an account <Link to={"/sign-in"} className="text-blue-700 underline ">Sign in</Link></h2>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default Signup