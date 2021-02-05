// Validates the current game's msrp & returns appropriate HTML
export const getMSRP = (msrp) => {
    if(msrp === undefined){
        return "No price available"
    } else {
        return `MSRP: ${msrp}`
    };
};

// Validates the related game's rules & returns appropriate HTML or link
export const getRules = (rules) => {
    if(rules === null || rules === undefined){
        return "No rules available"
    } else {
        return <a href={rules} target="_blank" rel="noopener noreferrer">Rules</a>
    };
};