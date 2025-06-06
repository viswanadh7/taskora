import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup.string().trim().trim().required(),
    password: yup.string().trim().required(),
});

export const signUpSchema = yup.object().shape({
    username: yup
        .string()
        .matches(
            /^(?!.*__)[a-zA-Z][a-zA-Z0-9_]{2,19}(?<!_)$/,
            'Username must start with a letter, be 3-20 characters long, and can include letters, numbers and no double underscores.'
        )
        .trim()
        .required(),
    name: yup.string().min(3).max(15).trim().required(),
    password: yup
        .string()
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            'Please choose a strong password'
        )
        .trim()
        .required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords not matched')
        .required('confirm password is a required field'),
});

export const taskSchema = yup.object().shape({
    title: yup.string().trim().required(),
    description: yup.string().trim(),
});

export const notesSchema = yup.object().shape({
    title: yup.string().required(),
    noteData: yup.string().required(),
});

export const projectSchema = yup.object().shape({
    title: yup.string().min(3).max(15).required(),
    description: yup.string().required(),
});
