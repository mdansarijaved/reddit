"use server";
import * as z from "zod";
import { registerSchema } from "@/schema/schema";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/auth/account/user";
import { generateVerificatitonToken } from "@/lib/token";

export const register = async (values: z.infer<typeof registerSchema>) => {
    const validatesFields = registerSchema.safeParse(values);
    if (!validatesFields.success) {
        return { error: "Invalid Fields" };
    }

    const { email, password, name } = validatesFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "User already exist with email." }
    }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        }
    })
    const verificationToken = await generateVerificatitonToken(email);
    return { success: "confirmation email sent!" };
}