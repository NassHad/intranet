"use client";

import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
    email: string;
    password: string;
};

const QrCodeTest = () => {
    const { register, handleSubmit } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
    };
    return (
        <form className="gap-2" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} type="text" />
            <input {...register("password")} type="password" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default QrCodeTest;
