export function getCSSVarPx(name: string): number {
    return parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(name)
    );
}
