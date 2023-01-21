const jwt = require('jsonwebtoken')
const core = require('@actions/core')

const keyId = process.env.INPUT_KEY_ID
const issuerId = process.env.INPUT_ISSUER_ID
const key = process.env.INPUT_KEY
const scope = process.env.INPUT_SCOPE

const now = Math.floor(Date.now() / 1000)

let payload = { iss: issuerId, iat: now, aud: 'appstoreconnect-v1', exp: now + 20 * 60 }
if (scope == '') {
    payload['scope'] = scope
}
const signedToken = jwt.sign(payload, key, { algorithm: 'ES256', keyid: keyId })

core.setOutput('token', signedToken)
