import React, { Component, useState, useEffect } from 'react'
import { Button } from "./ui/button";

import { useAccount } from "wagmi";
import type { NextComponentType } from "next";

import { ConnectButton } from "@rainbow-me/rainbowkit";


import WormholeBridge from '@wormhole-foundation/wormhole-connect';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog";
  
const BridgeUserToken: NextComponentType = () => {

    const { isConnected, address } = useAccount();
    const [ showBridge, setShowBridge ] = useState(false);
    const [ buttonBridge, setButtonBridge ] = useState("Show Bridge");
    const [isClient, setIsClient] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
        setIsClient(true);
      }, []);

    const toogleBridgeToken = () => {
        setOpenDialog(true);
    };

    return (
        <>
        <div className="flex items-center">

            {isClient && !isConnected && <ConnectButton />}
            {isClient && isConnected && (
              <>
                <Button onClick={() => toogleBridgeToken()} variant="outline">Bridge Tokens</Button>

                <Dialog open={openDialog} onOpenChange={setOpenDialog} >
                  <DialogContent className="sm:max-w-[425px] w-[600px]">

                    <div className="flex flex-col items-center justify-center w-96">
                        <WormholeBridge  />
                    </div>

                    <DialogFooter>
                      <Button
                        variant={"outline"}
                        onClick={() => setOpenDialog(false)}
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
                 </div> 
        </>
    )
}

export default BridgeUserToken;

