import { BorrowForm } from "@src/components/forms/BorrowForm";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {LendingPage} from "./lend";

export default function AllInOne() {
  const [mode, setMode] = React.useState<string | null>("lend");

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string | null
  ) => {
    setMode(newMode);
  };

  return (
    <div className="grid grid-cols-1">
      <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange}>
        <ToggleButton value="borrow">borrow</ToggleButton>
        <ToggleButton value="lend">lend</ToggleButton>
        <ToggleButton value="whitelist">whitelist</ToggleButton>
      </ToggleButtonGroup>

      <div>
        {mode == "borrow" && <BorrowForm></BorrowForm>}
        {mode == "lend" && <LendingPage></LendingPage>}
      </div>
    </div>
  );
}
