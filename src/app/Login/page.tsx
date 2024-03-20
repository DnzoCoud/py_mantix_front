"use client";
import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
import StackImg from "@/app/Login/stack.png";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/auth/authStore";
export default function Login() {
  const [value, setValue] = useState<string>("");

  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();

  const { isLoggedIn, login } = useAuthStore();

  const handleLogin = () => {
    login();
    router.push("/Dashboard");
  };

  useEffect((): void => {
    if (isLoggedIn) {
      router.push("/Dashboard");
    }
  });
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-dark_medium_bg ">
        <div className="w-11/12 h-5/6 flex shadow-md shadow-dark_bg">
          <div className="w-[40%] h-full bg-white_bg relative rounded-tl-md rounded-bl-md flex items-end">
            {/* <img src={StackImg.src} alt="" /> */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="visual"
              viewBox="0 0 100 1900"
              width="960"
              height="2000"
              version="1.1"
              className="h-full"
            >
              <path
                d="M834 2000L827.7 1969.7C821.3 1939.3 808.7 1878.7 810.3 1818C812 1757.3 828 1696.7 836 1636.2C844 1575.7 844 1515.3 837.5 1454.8C831 1394.3 818 1333.7 814.8 1273C811.7 1212.3 818.3 1151.7 821.7 1091C825 1030.3 825 969.7 828.2 909C831.3 848.3 837.7 787.7 842.3 727C847 666.3 850 605.7 842 545.2C834 484.7 815 424.3 815 363.8C815 303.3 834 242.7 845.2 182C856.3 121.3 859.7 60.7 861.3 30.3L863 0L960 0L960 30.3C960 60.7 960 121.3 960 182C960 242.7 960 303.3 960 363.8C960 424.3 960 484.7 960 545.2C960 605.7 960 666.3 960 727C960 787.7 960 848.3 960 909C960 969.7 960 1030.3 960 1091C960 1151.7 960 1212.3 960 1273C960 1333.7 960 1394.3 960 1454.8C960 1515.3 960 1575.7 960 1636.2C960 1696.7 960 1757.3 960 1818C960 1878.7 960 1939.3 960 1969.7L960 2000Z"
                fill="#222831"
              />
              <path
                d="M661 2000L630.7 1969.7C600.3 1939.3 539.7 1878.7 546.2 1818C552.7 1757.3 626.3 1696.7 647.2 1636.2C668 1575.7 636 1515.3 605.5 1454.8C575 1394.3 546 1333.7 534.8 1273C523.7 1212.3 530.3 1151.7 544.8 1091C559.3 1030.3 581.7 969.7 570.3 909C559 848.3 514 787.7 518.8 727C523.7 666.3 578.3 605.7 578.3 545.2C578.3 484.7 523.7 424.3 501.2 363.8C478.7 303.3 488.3 242.7 528.3 182C568.3 121.3 638.7 60.7 673.8 30.3L709 0L864 0L862.3 30.3C860.7 60.7 857.3 121.3 846.2 182C835 242.7 816 303.3 816 363.8C816 424.3 835 484.7 843 545.2C851 605.7 848 666.3 843.3 727C838.7 787.7 832.3 848.3 829.2 909C826 969.7 826 1030.3 822.7 1091C819.3 1151.7 812.7 1212.3 815.8 1273C819 1333.7 832 1394.3 838.5 1454.8C845 1515.3 845 1575.7 837 1636.2C829 1696.7 813 1757.3 811.3 1818C809.7 1878.7 822.3 1939.3 828.7 1969.7L835 2000Z"
                fill="#4f545b"
              />
              <path
                d="M373 2000L366.7 1969.7C360.3 1939.3 347.7 1878.7 341.3 1818C335 1757.3 335 1696.7 319 1636.2C303 1575.7 271 1515.3 251.8 1454.8C232.7 1394.3 226.3 1333.7 248.7 1273C271 1212.3 322 1151.7 334.8 1091C347.7 1030.3 322.3 969.7 309.7 909C297 848.3 297 787.7 282.5 727C268 666.3 239 605.7 227.7 545.2C216.3 484.7 222.7 424.3 243.5 363.8C264.3 303.3 299.7 242.7 328.5 182C357.3 121.3 379.7 60.7 390.8 30.3L402 0L710 0L674.8 30.3C639.7 60.7 569.3 121.3 529.3 182C489.3 242.7 479.7 303.3 502.2 363.8C524.7 424.3 579.3 484.7 579.3 545.2C579.3 605.7 524.7 666.3 519.8 727C515 787.7 560 848.3 571.3 909C582.7 969.7 560.3 1030.3 545.8 1091C531.3 1151.7 524.7 1212.3 535.8 1273C547 1333.7 576 1394.3 606.5 1454.8C637 1515.3 669 1575.7 648.2 1636.2C627.3 1696.7 553.7 1757.3 547.2 1818C540.7 1878.7 601.3 1939.3 631.7 1969.7L662 2000Z"
                fill="#818489"
              />
              <path
                d="M201 2000L207.3 1969.7C213.7 1939.3 226.3 1878.7 224.7 1818C223 1757.3 207 1696.7 179.8 1636.2C152.7 1575.7 114.3 1515.3 106.3 1454.8C98.3 1394.3 120.7 1333.7 143 1273C165.3 1212.3 187.7 1151.7 187.7 1091C187.7 1030.3 165.3 969.7 160.5 909C155.7 848.3 168.3 787.7 163.5 727C158.7 666.3 136.3 605.7 133.2 545.2C130 484.7 146 424.3 155.7 363.8C165.3 303.3 168.7 242.7 184.7 182C200.7 121.3 229.3 60.7 243.7 30.3L258 0L403 0L391.8 30.3C380.7 60.7 358.3 121.3 329.5 182C300.7 242.7 265.3 303.3 244.5 363.8C223.7 424.3 217.3 484.7 228.7 545.2C240 605.7 269 666.3 283.5 727C298 787.7 298 848.3 310.7 909C323.3 969.7 348.7 1030.3 335.8 1091C323 1151.7 272 1212.3 249.7 1273C227.3 1333.7 233.7 1394.3 252.8 1454.8C272 1515.3 304 1575.7 320 1636.2C336 1696.7 336 1757.3 342.3 1818C348.7 1878.7 361.3 1939.3 367.7 1969.7L374 2000Z"
                fill="#b6b8ba"
              />
              <path
                d="M0 2000L0 1969.7C0 1939.3 0 1878.7 0 1818C0 1757.3 0 1696.7 0 1636.2C0 1575.7 0 1515.3 0 1454.8C0 1394.3 0 1333.7 0 1273C0 1212.3 0 1151.7 0 1091C0 1030.3 0 969.7 0 909C0 848.3 0 787.7 0 727C0 666.3 0 605.7 0 545.2C0 484.7 0 424.3 0 363.8C0 303.3 0 242.7 0 182C0 121.3 0 60.7 0 30.3L0 0L259 0L244.7 30.3C230.3 60.7 201.7 121.3 185.7 182C169.7 242.7 166.3 303.3 156.7 363.8C147 424.3 131 484.7 134.2 545.2C137.3 605.7 159.7 666.3 164.5 727C169.3 787.7 156.7 848.3 161.5 909C166.3 969.7 188.7 1030.3 188.7 1091C188.7 1151.7 166.3 1212.3 144 1273C121.7 1333.7 99.3 1394.3 107.3 1454.8C115.3 1515.3 153.7 1575.7 180.8 1636.2C208 1696.7 224 1757.3 225.7 1818C227.3 1878.7 214.7 1939.3 208.3 1969.7L202 2000Z"
                fill="#eeeeee"
              />
            </svg>
          </div>
          <div className="flex-grow bg-dark_bg rounded-tr-md rounded-br-md flex justify-center items-center">
            <div className="flex flex-col items-center w-11/12">
              <h1 className="text-center text-6xl font-extrabold text-white">
                Iniciar Sesion
              </h1>
              <div className="flex flex-col w-full  items-center ">
                <div className="flex flex-col mt-4 w-full items-center">
                  <label htmlFor="email" className="text-white">
                    Correo Electronico
                  </label>
                  <InputText
                    id="email"
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setValue(e.target.value)
                    }
                    className="w-2/3 "
                  />
                </div>
                <div className="flex flex-col mt-4 w-full items-center">
                  <label htmlFor="password" className="text-white">
                    Contraseña
                  </label>

                  <Password
                    inputId="password"
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setValue(e.target.value)
                    }
                    feedback={false}
                    tabIndex={1}
                    pt={{
                      root: ({ props }: any) => ({
                        className: "w-2/3",
                      }),
                      input: {
                        className: "w-full",
                      },
                    }}
                  />
                </div>
              </div>
              <Button
                className="dark:bg-white_bg mt-6"
                label="Iniciar Sesion"
                onClick={handleLogin}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
