import React from "react";

export default interface MenuEntry {
    label: string,
    callback: React.FC<{}>;
};