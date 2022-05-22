import logoPng from "../../public/Logo_BONDFI.jpg";
import Container from "@mui/material/Container";
import ConnectWallet from "../ui/ConnectWallet";
import React, { useEffect, useState } from "react";
import { useWalletAuth } from "../../lib/walletContext";

export const Footer = () => {
  return (
    <Container maxWidth="xl" className=" flex text-right py-20  ">
      <div className="bg-gray-50 w-full justify-between">
        <hr className="h-0.5 bg-black shadow-xl rounded-xl  " />
        <div className="text-left text-gray-400">Contact: xx@GMAIL.com</div>

        <div>
          <div className="text-xs text-gray-400 pr-40">Mentored By:</div>
          <a
            href="
https://ormi.fi"
            target="_blank"
          >
            {" "}
            <img src="./orni.jpeg" width="50" /> Orni Finance
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
