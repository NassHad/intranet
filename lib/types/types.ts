import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
    name: string;
    redirectionUrl: string;
    isFile: boolean;
    file: File;
    fileName: string;
};

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
