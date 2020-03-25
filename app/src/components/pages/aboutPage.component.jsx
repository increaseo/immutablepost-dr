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
                    <p>Content for About Page</p>
                </div>
            </div>
       
        );

}