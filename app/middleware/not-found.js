const notFound = (req, res, next) => {
    req.status(404).json({ msg: `Route to ${req.originalUrl} not found` });
}

module.exports = notFound;