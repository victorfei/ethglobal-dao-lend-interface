import { Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import styles from "../styles/Home.module.css";

// update main

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Button variant="contained" onClick={() => router.push("/lend")}>
        {" "}
        Go to Lend
      </Button>
    </div>
  );
};

export default Home;
