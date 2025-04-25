export function validateNameValue(name: string): boolean {
    let nameStrength = 0;

    if (name?.length > 0 && /^[A-Z]/.test(name) && name[0] === name[0].toUpperCase()) {
        nameStrength += 1;
    }
    if (name?.length >= 3) {
        nameStrength += 1;
    }
    if (name?.slice(1) === name.slice(1).toLowerCase()) {
        nameStrength += 1;
    }
    return nameStrength === 3;
}
