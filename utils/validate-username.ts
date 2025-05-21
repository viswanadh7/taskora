// 3–20 characters

// Only letters, numbers, underscores (_)

// Starts with a letter

// No consecutive underscores

// Cannot end with an underscore

export const isUsernameValid = (username: string): boolean => {
    const usernameRegex = /^(?!.*__)[a-zA-Z][a-zA-Z0-9_]{2,19}(?<!_)$/;
    return !usernameRegex.test(username);
};
