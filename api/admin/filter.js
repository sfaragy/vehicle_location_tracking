module.exports = getRecords = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`);
        const posts = await Post.find(JSON.parse(queryStr));
        res.json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch (err) {
        res.status(401).json({
            status: 'error',
            message: 'Error in post finding',
            error: err
        })
    }
}