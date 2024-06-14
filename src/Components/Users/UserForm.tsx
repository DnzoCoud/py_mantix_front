"use client";
import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { IUser } from "@/interfaces/IUser";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRole } from "@/interfaces/IRole";
import { useToastStore } from "@/stores/useToastStore";
import { useDispatch } from "react-redux";
import LoaderComponents from "../Globals/Loader/LoaderComponents";
import { Fieldset } from "primereact/fieldset";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import {
  useFetchRolesQuery,
  useFetchUserByIdQuery,
  useSaveUserMutation,
  useUpdateUserMutation,
  useUploadUsersMutation,
} from "@/redux/services/userService";
import { setUpdateUser, setUser } from "@/redux/features/userSlice";
import { getBase64 } from "@/Utils/useComposables";
import { skipToken } from "@reduxjs/toolkit/query";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import UploadErrors from "../Globals/UploadErrors";

export default function UserForm({ id }: { id?: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IUser>();
  const [uploadErrors, setUploadErrors] = useState<
    { fila: number; columna: string; message: string }[]
  >([]);
  const username = watch("username", "");
  const email = watch("email", "");
  const first_name = watch("first_name", "");
  const last_name = watch("last_name", "");

  const [roles, setRoles] = useState<IRole[] | []>([]);
  const [rol, setRol] = useState<IRole | null>();
  const [saveLoad, setSaveLoad] = useState<boolean>(false);
  const toastStore = useToastStore();
  const dispatch = useDispatch();
  const { data: fetchRoles, isLoading: rolesLoading } = useFetchRolesQuery();
  const [saveUser] = useSaveUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [uploadUsers] = useUploadUsersMutation();
  const { data: user } = useFetchUserByIdQuery(id ? { id } : skipToken);
  const [uploadType, setUploadType] = useState<string>("");
  useEffect(() => {
    register("username", { required: "Este campo es obligatorio" });
    register("email", { required: "Este campo es obligatorio" });
    register("first_name", { required: "Este campo es obligatorio" });
    register("last_name", { required: "Este campo es obligatorio" });

    if (fetchRoles) setRoles(fetchRoles);

    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setRol(user.role_detail);
    }
  }, [fetchRoles, user]);

  const handleRoleChange = (event: IRole | null) => {
    setRol(event);
  };

  const onUpload = async (event: FileUploadHandlerEvent) => {
    const files = event.files;
    if (files.length > 0) {
      setSaveLoad(true);
      try {
        if (uploadType !== "") {
          const base64File = await getBase64(files[0]);
          const newUsers = await uploadUsers({
            excel_base64: base64File,
            type: uploadType,
          }).unwrap();
          newUsers.map((user) => {
            dispatch(setUser(user));
          });
          toastStore.setMessage("Cargue exitoso", toastStore.SUCCES_TOAST);
        } else {
          toastStore.setMessage(
            "Selecciona lo que vas a cargar",
            toastStore.ERROR_TOAST
          );
        }
        // await uploadFile({ file: base64File });
        // console.log('File uploaded successfully', base64File);
      } catch (error:any) {
        setUploadErrors(error.data?.error || []);

        toastStore.setMessage(
          "Error durante el cargue",
          toastStore.ERROR_TOAST
        );
      } finally {
        setSaveLoad(false);
      }
    }
  };

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    if (rol) {
      await createUser(
        data.username,
        data.email,
        data.first_name ?? "",
        data.last_name ?? "",
        rol.id
      );
    }
  };

  const createUser = async (
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    role: number
  ) => {
    setSaveLoad(true);

    try {
      if (!id) {
        const savedUser = await saveUser({
          username,
          email,
          first_name,
          last_name,
          role,
        }).unwrap();
        if (savedUser) dispatch(setUser(savedUser));
      } else {
        const userUpdated = await updateUser({
          id,
          username,
          email,
          first_name,
          last_name,
          role,
        }).unwrap();
        if (userUpdated) dispatch(setUpdateUser(userUpdated));
      }
      toastStore.setMessage(
        id
          ? "Usuario actualizado correctamente"
          : "Usuario registrado correctamente",
        toastStore.SUCCES_TOAST
      );
    } catch (error: any) {
      console.log(error);
      toastStore.setMessage(error.message, toastStore.ERROR_TOAST);
    } finally {
      setSaveLoad(false);
    }
  };
  return (
    <>
      <form
        className="flex flex-col justify-evenly relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LoaderComponents isLoad={saveLoad} />
        <div className="grid grid-cols-12 gap-4 mt-4">
          {!id && (
            <div className="col-span-12 mb-4">
              <Fieldset legend="Cargue Masivo" toggleable>
                {uploadErrors.length > 0 && (
                  <UploadErrors errors={uploadErrors} />
                )}
                <h2 className="font-bold">Que vas a cargar?</h2>
                <div className="flex flex-wrap gap-3 my-2">
                  <div className="flex items-center">
                    <RadioButton
                      inputId="directores"
                      name="seleccion"
                      value="directores"
                      onChange={(e: RadioButtonChangeEvent) =>
                        setUploadType(e.value)
                      }
                      checked={uploadType === "directores"}
                    />
                    <label htmlFor="directores">Directores</label>
                  </div>
                  <div className="flex items-center">
                    <RadioButton
                      inputId="managers"
                      name="seleccion"
                      value="managers"
                      onChange={(e: RadioButtonChangeEvent) =>
                        setUploadType(e.value)
                      }
                      checked={uploadType === "managers"}
                    />
                    <label htmlFor="managers">Managers</label>
                  </div>
                  <div className="flex items-center">
                    <RadioButton
                      inputId="tecnicos"
                      name="seleccion"
                      value="tecnicos"
                      onChange={(e: RadioButtonChangeEvent) =>
                        setUploadType(e.value)
                      }
                      checked={uploadType === "tecnicos"}
                    />
                    <label htmlFor="tecnicos">Tecnicos</label>
                  </div>
                </div>
                <FileUpload
                  uploadLabel="Subir Archivo"
                  chooseLabel="Cargue Masivo"
                  cancelLabel="Cancelar"
                  mode="advanced"
                  name="demo[]"
                  accept=".xls,.xlsx"
                  maxFileSize={1000000}
                  customUpload
                  uploadHandler={onUpload}
                  emptyTemplate={
                    <p className="m-0">Arrastra y suelta el archivo a subir.</p>
                  }
                  pt={{
                    chooseButton: {
                      className: "!bg-green-400",
                    },
                    progressbar: {
                      root: {
                        className: "hidden",
                      },
                    },
                    badge: {
                      root: {
                        className: "hidden",
                      },
                    },
                  }}
                />
              </Fieldset>
            </div>
          )}
          <div className="col-span-12 md:col-span-6">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  value={first_name ?? ""}
                  maxLength={30}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                  onChange={(e) => setValue("first_name", e.target.value)}
                />
                <label
                  htmlFor="first_name"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Nombre
                </label>
              </FloatLabel>
              {errors.first_name && <span>{errors.first_name.message}</span>}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  value={last_name ?? ""}
                  maxLength={30}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                  onChange={(e) => setValue("last_name", e.target.value)}
                />
                <label
                  htmlFor="last_name"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Apellido
                </label>
              </FloatLabel>
              {errors.last_name && <span>{errors.last_name.message}</span>}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  value={email ?? ""}
                  maxLength={30}
                  type="email"
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                  onChange={(e) => setValue("email", e.target.value)}
                />
                <label
                  htmlFor="email"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Correo Electronico
                </label>
              </FloatLabel>
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  value={username ?? ""}
                  maxLength={30}
                  type="username"
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                  onChange={(e) => setValue("username", e.target.value)}
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Nombre de usuario
                </label>
              </FloatLabel>
              {errors.username && <span>{errors.username.message}</span>}
            </div>
          </div>
          <div className="col-span-12  md:col-span-6">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <Dropdown
                  value={rol}
                  options={roles}
                  optionLabel="name"
                  dataKey="id"
                  filter
                  pt={{
                    root: {
                      className: "selectMaquina",
                    },
                  }}
                  loading={rolesLoading}
                  onChange={(e: DropdownChangeEvent) =>
                    handleRoleChange(e.value)
                  }
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Rol
                </label>
              </FloatLabel>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
            </div>
          </div>
          <div className="col-span-12 mt-4">
            <div className="w-full flex justify-center items-center">
              <Button
                label="Guardar"
                icon={PrimeIcons.SAVE}
                size="small"
                severity="success"
                loading={saveLoad}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
