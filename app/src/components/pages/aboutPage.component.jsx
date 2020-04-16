import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"

const { useDrizzle } = drizzleReactHooks;

export default function aboutPage() {

        return (
            <div>
                <div className="front-landing-intro page">
                    <h5 className="section-header info-color white-text text-center py-4">
                        <strong>About</strong>
                    </h5>
                </div>
                <div className="container section">
                    immutable<br/>
                    /ɪˈmjuːtəb(ə)l/<br/>
                    adjective<br/>
                    <p>unchanging over time or unable to be changed.</p>
                    <p>Immutable Post is built on the ethereum blockchain. Ethereum is an open source, public, blockchain-based distributed computing platform and operating system featuring smart contract (scripting) functionality. We've used this technology to allow you to write content onto the blockchain where it is stored immutably.</p>
                    <p>Immutable Post is a project developed and managed by <a href="https://www.increaseo.com/" target="_blank">Increaseo</a>, an Australian digital agency which provides services including blockchain development, web & app development, SEO and digital marketing services.</p>
                </div>
            </div>
       
        );

}