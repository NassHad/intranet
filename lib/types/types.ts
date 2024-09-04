import { FieldError, UseFormRegister } from "react-hook-form";
import mongoose from "mongoose";

export interface IQRCode {
    _id: mongoose.Types.ObjectId;
    name: string;
    isFile: boolean;
    fileName?: string;
    entryUrl: string;
    redirectionUrl: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedBy: mongoose.Types.ObjectId;
    updatedAt: Date;
}

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export type ValidFieldNames =
    | "email"
    | "redirectionUrl"
    | "isFile"
    | "file"
    | "fileName";
