
const verify = async (req, res, next) => {
    const user = req.header('user')
    const password = req.header('password')
    if (user === process.env.user && password === process.env.password)
        next()
    else    
        return res.status(401).send({
            "error": "You are not authorized to send this request"
        })
}

module.exports = verify