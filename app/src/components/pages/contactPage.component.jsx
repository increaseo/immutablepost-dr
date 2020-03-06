import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"

const { useDrizzle } = drizzleReactHooks;

export default function contactPage() {

    

    return (
        <div className="section">
            <h5 className="section-header info-color white-text text-center py-4">
                <strong>Contact Page</strong>
            </h5>
            <div className="container">
                <p>Content for Contact Page</p>
            </div>
        </div>
   
    );
}