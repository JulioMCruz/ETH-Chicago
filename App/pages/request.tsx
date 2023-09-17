
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const assets = [
  {
    label: "ETH",
    value: "eth",
  },
  {
    label: "USDC",
    value: "usdc",
  },
  {
    label: "WETH",
    value: "weth",
  },
  {
    label: "WBTC",
    value: "btc",
  },
];

const contacts = [
  {
    label: "Select Contact",
    value: "",
  },
  {
    label: "Contact 1",
    value: "user01",
  },
  {
    label: "Contact 2",
    value: "user02",
  },
  {
    label: "General Public",
    value: "user03",
  },
];

const Dashboard: NextPage = () => {

  const { isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("eth");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const processInvest = () => {
    console.log("Investing...");
    setOpenDialog(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>

      <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Request</CardTitle>
            <CardDescription>Create your request amount.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="contact">Contact</Label>
                  <Select onValueChange={setContact} defaultValue="">
                    <SelectTrigger id="contact">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {contacts.map((f, i) => (
                        <SelectItem
                          key={"contact-option-" + i}
                          value={f.value}
                        >
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="buying">Currency</Label>
                  <Select
                    onValueChange={setSelectedAsset}
                    defaultValue={selectedAsset}
                  >
                    <SelectTrigger id="buying">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {assets.map((asset, i) => (
                        <SelectItem key={"asset-" + i} value={asset.value}>
                          {asset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amountRequested">
                    Amount Requested
                  </Label>
                  <Input
                    id="amountRequested"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="requestDate">Request Date</Label>
                  <Input
                    id="requestDate"
                    readOnly
                    value={"17 Sep 2023"}
                    className="bg-secondary/100"
                  />
                </div>

              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            {isClient && !isConnected && <ConnectButton />}
            {isClient && isConnected && (
              <>
                <Button onClick={() => processInvest()}>Review Request</Button>

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Review Request</DialogTitle>
                      <DialogDescription>
                        We will send your amount requested to your contact.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <p>Amount: ${amount}  </p>
                      <p>Contact: {contact}</p>
                    </div>

                    <DialogFooter>
                      <Button
                        variant={"outline"}
                        onClick={() => setOpenDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={() => setOpenDialog(false)}
                      >
                        Send Request
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </CardFooter>
        </Card>
        
      </main>

    </div>
  );
};

export default Dashboard;