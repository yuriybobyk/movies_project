import React from 'react';
import {useForm} from "react-hook-form";

const Login = () => {


    const {register, handleSubmit, formState: {errors}} = useForm()
    return (
        <div
            className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <img
                src="https://rb.gy/p2hphi"
                alt="background"
                className="absolute -z-10 hidden opacity-60 sm:inline object-cover"
            />

            <img
                src="https://rb.gy/ulxxee"
                alt="netflix"
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                width={150}
                height={150}
            />

            <form
                className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md lg:mx-auto lg:max-w-[450px]"
            >
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className="space-y-4">
                    <label className="inline-block w-full">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            {...register('email', {required: true})}
                        />
                        {errors.email && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Please enter a valid email.
                            </p>
                        )}
                    </label>
                    <label className="inline-block w-full">
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            {...register('password', {required: true})}
                        />
                        {errors.password && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Your password must contain between 4 and 60 characters.
                            </p>
                        )}
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full rounded bg-[#e50914] py-3 font-semibold"
                >
                    Sign In
                </button>

                <div className="text-[gray]">
                    New to Netflix?{' '}
                    <button
                        type="button"
                        className="text-white hover:underline">
                        Sign up now
                    </button>
                </div>
            </form>
        </div>
    );
};

export {Login}
