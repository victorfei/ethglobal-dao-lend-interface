import React, { useState, useEffect } from "react";

import { Button, Modal, Box, Typography } from "@mui/material";
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
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          Hello
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
        </Box>
      </Modal>
    </div>
  );
};

export default LendingModal;
