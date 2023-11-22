export interface ThrowableErrorType {
    message: null | string;
    status: number;
    code: any;
}
const throwableErrorLocal: ThrowableErrorType = {
    message: null,
    status: 400,
    code: null,
}
export const ThrowableError = (message?: string, status?: number, code?: any) =>{
    return {...throwableErrorLocal, message, status, code} as ThrowableErrorType
}
