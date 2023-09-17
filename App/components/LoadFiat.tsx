import React, { Component } from 'react'
import { Button } from "../components/ui/button";
import Transak from "@biconomy/transak";

import { useAccount } from "wagmi";
import type { NextComponentType } from "next";


// const transak = new Transak('STAGING');
// transak.init(); 


//export default class LoadFiat extends Component {
const LoadFiat: NextComponentType = () => {

    const { isConnected, address } = useAccount();

    // init the widget
    const transak = new Transak('STAGING', {
        walletAddress: address,
        // userData: {
        //   firstName: userInfo?.name || '',
        //   email: userInfo?.email || '',
        // },
      });

      const processFiat = () => {
        console.log("process Fiat...");
        transak.init();
      };

    return (
        <>
            <Button variant="outline" onClick={() => processFiat() }>Recharge Money</Button>
        </>
    )
}

export default LoadFiat;

