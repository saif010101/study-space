export const registerErrorMessages = new Map<string, string>([
    [
        "username",
        "Username must be 5-20 characters long and contain only letters and numbers.",
    ],
    [
        "display_name",
        "Display Name must be 5-50 characters long and contain only letters.",
    ],
    ["email", "Please enter a valid email address."],
    [
        "password",
        "Password must be 8-20 characters long and contain at least one letter and one number.",
    ],
]);