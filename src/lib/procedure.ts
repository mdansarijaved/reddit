
import { createClient } from "@/utils/supabase/server";
import { createServerActionProcedure } from "zsa";


const authProcedureBase = createServerActionProcedure().handler(async () => {
    try {
        const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            throw new Error("User not authenticated");
        }

        return {
            ...user,
        };
    } catch {
        throw new Error("User not authenticated");
    }
});
export const authedProcedure = authProcedureBase.createServerAction();