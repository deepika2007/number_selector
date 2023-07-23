export const generateQuickPicArray = (n, length) => {
    const nums = new Set();
    while (nums.size !== n) {
        nums.add(Math.floor(Math.random() * length) + 1);
    }
    const result = [...nums].sort();
    return result
}