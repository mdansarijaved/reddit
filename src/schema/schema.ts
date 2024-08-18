import * as z from 'zod';

export const singInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Invalid password"
    })

})


export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(1, {
        message: "Invalid password"
    })
})


export const postSchema = z.object({
    title: z.string().min(1).max(300),
    body: z.string().min(1),
    media: z.string().array(),
});
