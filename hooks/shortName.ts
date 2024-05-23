export function shortName(fullName: string) {
    const initials = fullName.split(' ').map(name => name[0].toUpperCase()).join('');
    return initials.substring(0, 2);
}