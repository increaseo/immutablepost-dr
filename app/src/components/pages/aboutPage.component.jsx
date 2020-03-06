import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"

const { useDrizzle } = drizzleReactHooks;

export default function aboutPage() {

        return (
            <div className="section">
                <h5 className="section-header info-color white-text text-center py-4">
                    <strong>About Page</strong>
                </h5>
                <div className="container">
                    <p>Content for About Page</p>
                </div>
            </div>
       
        );

}