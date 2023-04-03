module.exports = {
    "*.{css,scss,md,json}": "prettier --write",
    "*.{ts,js}x?": ["prettier --write", "eslint --fix"],
};
