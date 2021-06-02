// Validates the current game's msrp & returns appropriate HTML
export const getMSRP = msrp => msrp === undefined ? 
    "No price available" 
    : 
    `MSRP: ${msrp}`;

// Validates the related game's rules & returns appropriate HTML or link
export const getRules = (rules) => rules === null || rules === undefined ? 
    "No rules available" 
    : 
    <a href={rules} target="_blank" rel="noopener noreferrer">Rules</a>