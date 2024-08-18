import jwt from 'jsonwebtoken'

export default async function validTokenEmail(req, res, next) {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      console.log('No header')
      return res.status(401).send({
        error: {
          message: 'Necesitas enviar un token'
        }
      })
    }

    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_EMAIL_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).json({
          error: {
            message: 'El token no es válido'
          }
        })
      } else {
        req.user = payload
        next()
      }
    })
  } catch (error) {
    const tokenError = new Error(error)

    res.status(400).send({
      error: {
        message: `${tokenError}`
      }
    })
  }
}
