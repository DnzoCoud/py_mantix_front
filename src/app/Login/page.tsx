"use client";
import React, { useRef, useState } from "react";
import Waves from "./svg.png";
import { InputText } from "primereact/inputtext";
import { Steps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
export default function page() {
  const toast = useRef<Toast>(null);
  const [value, setValue] = useState<string>("");
  const items: MenuItem[] = [
    {
      label: "Personal Info",
    },
    {
      label: "Reservation",
    },
    {
      label: "Review",
    },
  ];
  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
    });
  };

  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-dark_medium_bg">
        <div className="w-11/12 h-5/6 flex ">
          <div className="w-[40%] h-full bg-white_bg relative rounded-tl-md rounded-bl-md">
            <svg
              id="wave"
              viewBox="0 0 1440 150"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-[270deg] hidden"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                  <stop stopColor="rgba(34, 40, 49, 1)" offset="0%"></stop>
                  <stop stopColor="rgba(238, 238, 238, 1)" offset="100%"></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#sw-gradient-0)"
                d="M0,30L17.1,35C34.3,40,69,50,103,57.5C137.1,65,171,70,206,82.5C240,95,274,115,309,105C342.9,95,377,55,411,47.5C445.7,40,480,65,514,67.5C548.6,70,583,50,617,37.5C651.4,25,686,20,720,17.5C754.3,15,789,15,823,32.5C857.1,50,891,85,926,82.5C960,80,994,40,1029,25C1062.9,10,1097,20,1131,30C1165.7,40,1200,50,1234,50C1268.6,50,1303,40,1337,45C1371.4,50,1406,70,1440,70C1474.3,70,1509,50,1543,37.5C1577.1,25,1611,20,1646,35C1680,50,1714,85,1749,90C1782.9,95,1817,70,1851,67.5C1885.7,65,1920,85,1954,82.5C1988.6,80,2023,55,2057,57.5C2091.4,60,2126,90,2160,97.5C2194.3,105,2229,90,2263,77.5C2297.1,65,2331,55,2366,62.5C2400,70,2434,95,2451,107.5L2468.6,120L2468.6,150L2451.4,150C2434.3,150,2400,150,2366,150C2331.4,150,2297,150,2263,150C2228.6,150,2194,150,2160,150C2125.7,150,2091,150,2057,150C2022.9,150,1989,150,1954,150C1920,150,1886,150,1851,150C1817.1,150,1783,150,1749,150C1714.3,150,1680,150,1646,150C1611.4,150,1577,150,1543,150C1508.6,150,1474,150,1440,150C1405.7,150,1371,150,1337,150C1302.9,150,1269,150,1234,150C1200,150,1166,150,1131,150C1097.1,150,1063,150,1029,150C994.3,150,960,150,926,150C891.4,150,857,150,823,150C788.6,150,754,150,720,150C685.7,150,651,150,617,150C582.9,150,549,150,514,150C480,150,446,150,411,150C377.1,150,343,150,309,150C274.3,150,240,150,206,150C171.4,150,137,150,103,150C68.6,150,34,150,17,150L0,150Z"
              ></path>
              <defs>
                <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
                  <stop stopColor="rgba(238, 238, 238, 1)" offset="0%"></stop>
                  <stop stopColor="rgba(34, 40, 49, 1)" offset="100%"></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#sw-gradient-1)"
                d="M0,120L17.1,107.5C34.3,95,69,70,103,72.5C137.1,75,171,105,206,107.5C240,110,274,85,309,67.5C342.9,50,377,40,411,52.5C445.7,65,480,100,514,115C548.6,130,583,125,617,107.5C651.4,90,686,60,720,40C754.3,20,789,10,823,17.5C857.1,25,891,50,926,60C960,70,994,65,1029,57.5C1062.9,50,1097,40,1131,47.5C1165.7,55,1200,80,1234,85C1268.6,90,1303,75,1337,72.5C1371.4,70,1406,80,1440,90C1474.3,100,1509,110,1543,107.5C1577.1,105,1611,90,1646,72.5C1680,55,1714,35,1749,27.5C1782.9,20,1817,25,1851,40C1885.7,55,1920,80,1954,75C1988.6,70,2023,35,2057,35C2091.4,35,2126,70,2160,80C2194.3,90,2229,75,2263,60C2297.1,45,2331,30,2366,42.5C2400,55,2434,95,2451,115L2468.6,135L2468.6,150L2451.4,150C2434.3,150,2400,150,2366,150C2331.4,150,2297,150,2263,150C2228.6,150,2194,150,2160,150C2125.7,150,2091,150,2057,150C2022.9,150,1989,150,1954,150C1920,150,1886,150,1851,150C1817.1,150,1783,150,1749,150C1714.3,150,1680,150,1646,150C1611.4,150,1577,150,1543,150C1508.6,150,1474,150,1440,150C1405.7,150,1371,150,1337,150C1302.9,150,1269,150,1234,150C1200,150,1166,150,1131,150C1097.1,150,1063,150,1029,150C994.3,150,960,150,926,150C891.4,150,857,150,823,150C788.6,150,754,150,720,150C685.7,150,651,150,617,150C582.9,150,549,150,514,150C480,150,446,150,411,150C377.1,150,343,150,309,150C274.3,150,240,150,206,150C171.4,150,137,150,103,150C68.6,150,34,150,17,150L0,150Z"
              ></path>
              <defs>
                <linearGradient id="sw-gradient-2" x1="0" x2="0" y1="1" y2="0">
                  <stop stopColor="rgba(34, 40, 49, 1)" offset="0%"></stop>
                  <stop stopColor="rgba(238, 238, 238, 1)" offset="100%"></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#sw-gradient-2)"
                d="M0,15L17.1,20C34.3,25,69,35,103,50C137.1,65,171,85,206,100C240,115,274,125,309,117.5C342.9,110,377,85,411,85C445.7,85,480,110,514,105C548.6,100,583,65,617,47.5C651.4,30,686,30,720,35C754.3,40,789,50,823,50C857.1,50,891,40,926,30C960,20,994,10,1029,17.5C1062.9,25,1097,50,1131,50C1165.7,50,1200,25,1234,17.5C1268.6,10,1303,20,1337,27.5C1371.4,35,1406,40,1440,37.5C1474.3,35,1509,25,1543,37.5C1577.1,50,1611,85,1646,95C1680,105,1714,90,1749,82.5C1782.9,75,1817,75,1851,67.5C1885.7,60,1920,45,1954,32.5C1988.6,20,2023,10,2057,5C2091.4,0,2126,0,2160,15C2194.3,30,2229,60,2263,60C2297.1,60,2331,30,2366,32.5C2400,35,2434,70,2451,87.5L2468.6,105L2468.6,150L2451.4,150C2434.3,150,2400,150,2366,150C2331.4,150,2297,150,2263,150C2228.6,150,2194,150,2160,150C2125.7,150,2091,150,2057,150C2022.9,150,1989,150,1954,150C1920,150,1886,150,1851,150C1817.1,150,1783,150,1749,150C1714.3,150,1680,150,1646,150C1611.4,150,1577,150,1543,150C1508.6,150,1474,150,1440,150C1405.7,150,1371,150,1337,150C1302.9,150,1269,150,1234,150C1200,150,1166,150,1131,150C1097.1,150,1063,150,1029,150C994.3,150,960,150,926,150C891.4,150,857,150,823,150C788.6,150,754,150,720,150C685.7,150,651,150,617,150C582.9,150,549,150,514,150C480,150,446,150,411,150C377.1,150,343,150,309,150C274.3,150,240,150,206,150C171.4,150,137,150,103,150C68.6,150,34,150,17,150L0,150Z"
              ></path>
            </svg>
          </div>
          <div className="flex-grow bg-dark_bg rounded-tr-md rounded-br-md">
            <h1>Iniciar Sesion</h1>
            <InputText
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
            <Button label="Submit" onClick={() => setVisible(true)} />
            <Toast ref={toast} />

            <Dialog
              header="Header"
              visible={visible}
              maximizable
              style={{ width: "50vw" }}
              onHide={() => setVisible(false)}
            >
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
