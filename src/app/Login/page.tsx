"use client";
import React, { ChangeEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
import Logo from './loginForm.svg'
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Loader from "@/Components/Globals/Loader/Loader";
import { Tag } from "primereact/tag";
import { FloatLabel } from 'primereact/floatlabel';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState({
    email: "" as string,
    password: "" as string,
  });
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    const responseNextAuth = await signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setLoading(false)
      console.log(responseNextAuth.error.split(","));
      toast.error("Credenciales Invalidas")
      return;
    }
    toast.success("Ingreso correcto")
    if(loginData.password === "mantixnwusr2024*"){
      router.push("/Login/changePassword")
    }else{
      router.push("/Maintenance/calendar");
    }
    setLoading(false)
    // await login(loginData.email, loginData.password);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };
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
      <div className="w-full h-full flex flex-col md:flex-row justify-center items-center bg-white relative  transiton-all">
        <div className="md:m-4 w-2/4 lg:w-[40%]">
          <Image  src={Logo.src} alt="" className="object-cover" width={600} height={600} priority/>
        </div>
        <form
          className="flex flex-col items-center md:items-start w-full md:w-2/4 lg:w-[40%] lg:ml-4"
          onSubmit={handleLogin}
        >
          <h1 className="text-4xl font-extrabold text-dark_bg">
            Iniciar Sesion
          </h1>
          <div className="flex flex-col w-3/4  items-start mt-2">
            <div className="flex flex-col mt-4 w-full">
              <FloatLabel>
                  <InputText name="email" type="email" value={loginData.email} onChange={handleChange} id="username" className="w-full"/>
                  <label htmlFor="username" style={{left:'3%', transition:'all .2s ease'}}>Correo electronico</label>
              </FloatLabel>

            </div>
            <div className="flex flex-col w-full">
              <FloatLabel pt={{root:{className:'mt-8'}}}>
                <Password
                  inputId="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  feedback={false}
                  tabIndex={1}
                  toggleMask
                  pt={{
                    root:{
                      className: "w-full",
                    },
                    input: {
                      className: "w-full",
                    },
                    iconField:{
                      className:"w-full"
                    },
                  }}
                />
                <label htmlFor="username" style={{left:'3%', transition:'all .2s ease'}}>Contraseña</label>
              </FloatLabel>
              
            </div>
            <Button className="dark:bg-white_bg mt-6" label="Iniciar Sesion" loading={loading} pt={{
              root:{
                className:'w-full'
              }
            }} />
          </div>
          
        </form>
      </div>
      <div className="w-full h-8 absolute bottom-1 flex items-center justify-evenly">
        <h1 className="dark:text-white font-extrabold mr-1">Mantix <Tag severity="warning" value="Pro" /></h1>
        <span>V 1.0.0</span>
      </div>
    </>
  );
}
