const validation = (schema) => async (req, res, next) => {
  const body = req.body
  try {
    await schema.validate(body)
    return next()
  } catch(e) {
    return res.status(400).json({ "ошибка": e })
  }
}

module.exports = validation