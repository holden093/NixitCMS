#!/usr/bin/env node

const bcrypt = require('bcrypt')

function readHiddenInput(prompt) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin
    const stdout = process.stdout

    if (!stdin.isTTY || !stdout.isTTY) {
      reject(new Error('Interactive terminal required'))
      return
    }

    const wasRaw = stdin.isRaw
    const chunks = []

    const cleanup = () => {
      stdin.removeListener('data', onData)
      if (!wasRaw) {
        stdin.setRawMode(false)
      }
      stdin.pause()
    }

    const fail = (error) => {
      cleanup()
      stdout.write('\n')
      reject(error)
    }

    const finish = () => {
      cleanup()
      stdout.write('\n')
      resolve(Buffer.concat(chunks).toString('utf8'))
    }

    const onData = (chunk) => {
      const value = chunk.toString('utf8')

      if (value === '\u0003') {
        fail(new Error('Cancelled'))
        return
      }

      if (value === '\r' || value === '\n') {
        finish()
        return
      }

      if (value === '\u007f') {
        chunks.pop()
        return
      }

      chunks.push(Buffer.from(value))
    }

    stdout.write(prompt)
    stdin.setRawMode(true)
    stdin.resume()
    stdin.on('data', onData)
  })
}

async function main() {
  const providedPassword = process.argv[2]
  const password = providedPassword ?? await readHiddenInput('Password: ')

  if (!password) {
    throw new Error('Password cannot be empty')
  }

  if (!providedPassword) {
    const confirmation = await readHiddenInput('Confirm password: ')
    if (password !== confirmation) {
      throw new Error('Passwords do not match')
    }
  }

  const hash = await bcrypt.hash(password, 12)
  process.stdout.write(`ADMIN_PASSWORD_HASH=${hash}\n`)
}

main().catch(error => {
  process.stderr.write(`${error.message}\n`)
  process.exit(1)
})
