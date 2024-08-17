"use client";

import { login } from "@/app/actions/login";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { singInSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type loginfrom = z.infer<typeof singInSchema>;

function LoginForm() {
  // const onClick = async (provider: "google" | "github") => {
  //   await signinoauth(provider);
  // };
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<loginfrom>({
    resolver: zodResolver(singInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: loginfrom) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const data = await login(values);

      setError(data.error);
      setSuccess(data.success);
    });
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[400px] h-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="email"
                        placeholder="johdoe@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <div className="py-2 text-center w-full bg-destructive/15">
                {error}
              </div>
            )}
            {success && (
              <div className="py-2 text-center w-full bg-emerald-500/30">
                {success}
              </div>
            )}
            <Button className="w-full">submit</Button>
          </form>
        </Form>
        {/* <div className="flex justify-center items-center gap-2 w-full py-2 ">
          <Button
            onClick={() => onClick("google")}
            className="w-full bg-emerald-500 text-white text-center py-2 px-3 rounded-lg"
          >
            Google
          </Button>
          <Button
            onClick={() => onClick("github")}
            className="w-full bg-emerald-500 text-white text-center py-2 px-3 rounded-lg"
          >
            Github
          </Button>
        </div> */}
      </div>
    </div>
  );
}

export default LoginForm;
