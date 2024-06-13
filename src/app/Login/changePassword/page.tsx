"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "./resetP.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthUser } from "@/redux/features/auth/authSlice";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Controller, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "@/redux/services/userService";
import Loader from "@/Components/Globals/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import { useLogoutMutation } from "@/redux/services/authService";
import { clearAuthUser } from "@/redux/features/auth/authSlice";
import { signOut } from "next-auth/react";

interface ChangePasswordForm {
  password: string;
  confirmPassword: string;
}
export default function ChangePasswordPage() {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const [updateUser] = useUpdateUserMutation()
  const authUser = useAppSelector(state => state.auth.authUser)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setAuthUser({
          token: session.user.token,
          user: {
            id: parseInt(session.user.id, 10),
            email: session.user.email ? session.user.email : "",
            first_name: session.user.first_name ? session.user.first_name : "",
            last_name: session.user.last_name ? session.user.last_name : "",
            is_director: session.user.is_director,
            is_manager: session.user.is_manager,
            username: session.user.username ? session.user.username : "",
            role_detail: session.user.role_detail,
          },
        })
      );
      localStorage.setItem("serverToken", session.user.token);
    }
  }, [session]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const onSubmit = async (data: ChangePasswordForm) => {
    await updatePassword(data.password)
  };

  const updatePassword = async (newPassword:string) => {
    setLoading(true)

    try {
      if(authUser){
        await updateUser({
          id:authUser.user.id,
          password: newPassword
        }).unwrap()
        await handleLogout()
        toast.success("Contraseña cambiada correctamente")
        router.push("/Login")
      }
    } catch (error:any) {
      toast.error("Error interno")
      
    }finally{
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    // await authData.logout();
    await logout().unwrap()
    await signOut({ callbackUrl: "/Login" });
    dispatch(clearAuthUser())
    localStorage.removeItem('serverToken');
  };

  const password = watch("password");

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <Loader isLoad={loading} />

      <div className="w-full h-full flex items-center justify-center">
      <div className="w-3/4 h-3/4 rounded-md shadow-md bg-white flex justify-between">
        <div className="flex flex-col justify-center items-center w-2/4">
          <Image
            src={Logo.src}
            alt="Logo"
            className="object-cover"
            width={600}
            height={600}
            priority
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-2/4 flex flex-col justify-center items-start"
        >
          <h1 className="font-bold text-4xl">Cambiar Contraseña</h1>
          <div className="grid grid-cols-12 gap-4 mt-4 w-full">
            <div className="col-span-12">
              <div className="w-11/12 flex flex-col mb-4">
                <FloatLabel>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "La contraseña es requerida" }}
                    render={({ field }) => (
                      <Password
                        {...field}
                        toggleMask
                        pt={{
                          root: { className: "w-full" },
                          input: { className: "w-full" },
                          iconField: { className: "w-full" },
                        }}
                      />
                    )}
                  />
                  <label
                    htmlFor="password"
                    style={{ left: "3%", transition: "all .2s ease" }}
                  >
                    Contraseña
                  </label>
                </FloatLabel>
                {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
                )}
              </div>
            </div>
            <div className="col-span-12">
              <div className="w-11/12 flex flex-col">
                <FloatLabel>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Confirmar contraseña es requerido",
                      validate: (value) =>
                        value === password || "Las contraseñas no coinciden",
                    }}
                    render={({ field }) => (
                      <Password
                        {...field}
                        toggleMask
                        pt={{
                          root: { className: "w-full" },
                          input: { className: "w-full" },
                          iconField: { className: "w-full" },
                        }}
                      />
                    )}
                  />
                  <label
                    htmlFor="confirmPassword"
                    style={{ left: "3%", transition: "all .2s ease" }}
                  >
                    Confirmar Contraseña
                  </label>
                </FloatLabel>
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-12">
              <Button
                type="submit"
                className="dark:bg-white_bg mt-6"
                label="Cambiar contraseña"
                pt={{ root: { className: "w-11/12" } }}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    </>

  );
}
{
  /* <a href="https://storyset.com/user">User illustrations by Storyset</a> */
}
