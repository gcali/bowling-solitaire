export function parseBoolean(s?: string, valueDefault: boolean = false): boolean {
    if (!s) {
        return valueDefault;
    }
    switch (s.toLowerCase()) {
        case 'true':
        case '1':
        case 'on':
        case 'yes':
        case 'y':
            return true;

        case 'false':
        case '0':
        case 'off':
        case 'no':
        case 'n':
            return false;
    }

    return valueDefault;
}
