import React, { Component, useState } from 'react'
import { Button } from "../components/ui/button";

import { useAccount } from "wagmi";
import type { NextComponentType } from "next";

import WormholeBridge from '@wormhole-foundation/wormhole-connect';

const BridgeUserToken: NextComponentType = () => {

    const { isConnected, address } = useAccount();
    const [ showBridge, setShowBridge ] = useState(false);
    const [ buttonBridge, setButtonBridge ] = useState("Show Bridge");
    

    const toogleBridgeToken = () => {
        setShowBridge(!showBridge);

    };

    return (
        <>
            <Button variant="outline" onClick={() => toogleBridgeToken() }>Bridge Token</Button>
            { (showBridge) && (
                <WormholeBridge />
            )

            }
        </>
    )
}

export default BridgeUserToken;

