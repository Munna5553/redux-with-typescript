import { Formik } from "formik";
import { signInSchema } from "./user.schema";
import { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../Features/auth/authActions";
import { useAppDispatch, useAppSelector } from "../Features/hook";
import { Button } from "./Button";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import { RiKey2Line } from "react-icons/ri";
import { BiEnvelope } from "react-icons/bi";



const SignIn = () => {
    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch()
    const { success } = useAppSelector(state => state.auth)

    const navigate = useNavigate()

    if (success) {
        navigate("/")
    }

    return (
        <div className="flex items-center justify-center h-[100dvh]">
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={signInSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(Login(values));
                    setSubmitting(false);
                }}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <div className="w-[20rem] flex flex-col items-center gap-4">

                        <h1 className="text-4xl font-semibold capitalize text-center mb-4">
                            welcome back
                        </h1>

                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">

                            <div>
                                <Input
                                    type="text"
                                    name="email"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={`pl-9 pr-3 py-3`}
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
                                    className={`pl-9 pr-8 py-3`}
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

                            <Button type="submit" className="font-medium text-lg text-white rounded-md bg-blue-800" disabled={isSubmitting}>
                                {"Sign in"}
                            </Button>

                        </form>
                        <h2 className="text-gray-400 flex gap-2 text-base font-normal">Already have an account? <Link to={"/sign-up"} className="text-blue-600 underline">Sign up</Link></h2>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default SignIn;