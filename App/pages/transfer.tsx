import Image from "next/image";
import Link from "next/link";

import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Button } from "../components/ui/button";
import { useState, useEffect } from 'react'

import LoadFiat from '../components/LoadFiat';
import BridgeUserToken from '../components/BridgeToken';

import { CalendarDays, Car } from "lucide-react"

import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import CareTokenABI from "../contracts/CareTokenABI";

const CONTRACT_ADDRESS = "0x1d6032b5e4044d1F870D65f56C067d3D79CbE35d";

const contractConfig = {
  addressOrName: CONTRACT_ADDRESS,
  contractInterface: CareTokenABI,
};

const TrasferList = [
  {
    title: "Requested: ETH $10",
    text1: "Contact: Contact 01",
    text2: "Message: Please seend me this amount",
    dateText: "19 Sep 2023",
  },
  {
    title: "Requested: USDC $100",
    text1: "Contact: Contact 02",
    text2: "Message: I need do some payments, help me.",
    dateText: "22 Sep 2023",
  },
  {
    title: "Requested: ARB 2000",
    text1: "Contact: Contact 03",
    text2: "Message: I have a geta business idea. do you like invest?",
    dateText: "22 Sep 2023",
  },
];


const Transfers: NextPage = () => {

  const { isConnected, address } = useAccount();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CareTokenABI,
    functionName: 'deposit',
    args: [1],
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Transfers</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>

        <div className="space-y-10 pb-4">
            <section id="features" className="container space-y-6 bg-slate-50 py-4 dark:bg-transparent md:py-12 lg:py-12">
              <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">

                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                  <div className="flex h-[300px] flex-col justify-between rounded-md p-6 items-center">
                    <div className="flex justify-center items-center">
                      <Image
                          src="/img/ChiCare-40.png"
                          alt="Request"
                          height={150} width={250}
                          className="img-wrapper aspect-auto object-cover rounded-lg transition-all duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="space-y-2 items-center">
                      <h1 className="font-bold text-3xl">Buy Currency</h1>
                    </div>
                    <div className="space-y-2 items-center">
                      {(isClient && isConnected) && (
                        <LoadFiat />
                      )}
                      {(isClient && !isConnected) && (
                        <ConnectButton label="Join Us"/>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                  <div className="flex h-[300px] flex-col justify-between rounded-md p-6 items-center">
                    <div className="flex justify-center items-center">
                      <Image
                          src="/img/ChiCare-40.png"
                          alt="Request"
                          height={150} width={250}
                          className="img-wrapper aspect-auto object-cover rounded-lg transition-all duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="space-y-2 items-center">
                      <h1 className="font-bold text-3xl">Bridge Currency</h1>
                    </div>
                    <div className="space-y-2 items-center">
                    {(isClient && isConnected) && (
                        <BridgeUserToken />
                      )}
                      {(isClient && !isConnected) && (
                        <ConnectButton label="Join Us"/>
                      )}
                    </div>
                  </div>
                </div>

              </div>
              <div className="mx-auto text-center md:max-w-[58rem]">
                <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Chi-Care streamlines the process of adding funds to our wallet using fiat or transfers from other networks, making it easier for you to support your friends, family, or community.
                </p>
              </div>
            </section>
        </div>

        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>Requested Transfers</CardTitle>
            <CardDescription>Monitor all active requested transfers.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              { TrasferList.map((portfolio, i) => (
                  <Card key={"portfolio-" + i} className='p-4 mb-6'>
                  <CardContent>
                    <h1 className="mb-2"><b>{portfolio.title}</b></h1>
                    <p className="mb-2">{portfolio.text1}</p>
                    {portfolio.text2 && (
                    <p className="mb-2">{portfolio.text2}</p>
                    )}
                    <span className='inline-flex'>
                      <CalendarDays className="h-6 w-6" /> 
                      <p className="ml-2">{portfolio.dateText}</p>
                    </span>
                  </CardContent>
                  <CardFooter>
                    <Button disabled={!write} onClick={()=> write?.()}>Fund Request</Button>
                  </CardFooter>
                </Card>
            ))}
            </form>
          </CardContent>
        </Card>


      </main>

    </div>
  );
};

export default Transfers;