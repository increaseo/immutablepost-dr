import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"

const { useDrizzle } = drizzleReactHooks;

export default function contactPage() {

    

    return (
        <div>
            <div className="front-landing-intro page">
                <h5 className="section-header info-color white-text text-center py-4">
                    <strong>Contact Us</strong>
                </h5>
            </div>
            <div className="container section">
                <p>Content for Contact Page</p>
            </div>
        </div>
   
    );
}