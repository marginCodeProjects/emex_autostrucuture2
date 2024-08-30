


export const calculateMarginPercent = (inputPercent: number) => {
    const minLeft = -10;
    const leftOffset = 930 * (inputPercent / 100);
    return minLeft + leftOffset;
};
