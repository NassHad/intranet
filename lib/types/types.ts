import { FieldError, UseFormRegister } from "react-hook-form";
import mongoose from "mongoose";
import { Types } from "mongoose";

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

export interface QRCode {
    _id: string;
    name: string;
    isFile: string;
    fileName?: string;
    entryUrl: string;
    redirectionUrl: string;
    // Add any other fields that your QRCode model has
}

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export interface CentralType {
    _id: string;
    name: string;
}

export interface StatsType {
    _id: string;
    name: string;
    year: string;
    month: string;
    category: string;
    central: string;
    userGroup: string;
    user: string;
    totalEarned: number;
}

export interface CategoryType {
    _id: string;
    name: string;
    active: boolean;
    parent: string;
}

export interface UserType {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    userGroup: string;
    salesman: boolean;
    salesmanCode: string;
}

export interface UserGroupType {
    _id: string;
    name: string;
    active: boolean;
}

export type ValidFieldNames =
    | "email"
    | "redirectionUrl"
    | "isFile"
    | "file"
    | "fileName";
