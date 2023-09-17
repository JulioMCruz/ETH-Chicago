import React, { Component, useState } from 'react'
import { Button } from "./ui/button";

import { useAccount } from "wagmi";
import type { NextComponentType } from "next";

import WormholeBridge from '@wormhole-foundation/wormhole-connect';

const BridgeUserToken: NextComponentType = () => {

    const { isConnected, address } = useAccount();
    const [ showBridge, setShowBridge ] = useState(false);
    const [ buttonBridge, setButtonBridge ] = useState("Show Bridge");

    const toogleBridgeToken = () => {
        setShowBridge(!showBridge);
        if (showBridge) {
            setShowBridge(false);
            setButtonBridge("Open Bridge")
        } else {
            setShowBridge(true);
            setButtonBridge("Close Bridge")
        }
    };

    return (
        <>
        <div className="flex items-center">
        <Button variant="outline" onClick={() => toogleBridgeToken() }>{buttonBridge}</Button>
            { (showBridge) && (
                <WormholeBridge />
            )
            }
        </div>
        </>
    )
}

export default BridgeUserToken;

