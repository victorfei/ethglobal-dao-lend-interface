import React, { useState, useEffect } from "react";

import { Button, Modal, Box, Typography, Container } from "@mui/material";
import { LendForm } from "./forms/LendForm";
import { PaymentToken } from "./forms/common";

export interface LendingModalProps {
  open: boolean;
  handleClose: any;
  addr: string;
  name: string;
  maturityDate: string;
  dao: string;
}

export const LendingModal = ({
  open,
  handleClose,
  addr,
  name,
  maturityDate,
  dao,
}: LendingModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "bg-white",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={style}
          className="bg-white rounded-xl shadow-lg p-8 justify-center"
        >
          <div className="text-center h-2 text-lg">Invest in {name}</div>
          <div className="justify-center">
            {" "}
            <LendForm
              lendDetails={{
                daoName: dao,
                amount: 0,
                paymentToken: PaymentToken.USDC,
                maturityDate: maturityDate,
                interestRate: 0.1,
                remainingBorrowAmount: 10,
                address: addr,
              }}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LendingModal;
