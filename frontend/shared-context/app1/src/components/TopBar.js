import React, { useState, useEffect } from 'react';
import axios from "axios";
import { NameContextProvider } from '@shared-context/shared-library';

import css from "./TopBar.css";

const RessourcesInfos = React.lazy(() => import('app2/SharedTopBar'));

export default function TopBar(props) {

    return (
        <div className="TopBar">
            <NameContextProvider.Provider value={[props.money, props.milk]}>
                <React.Suspense fallback="Loading Name">
                    <RessourcesInfos />
                </React.Suspense>
            </NameContextProvider.Provider>
        </div>
    )

}