import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { prisma } from '../lib/prisma'
import { ApiError, unauthorized } from '../lib/http'

export interface AuthRequest extends Request {
  userId?: number
}

export async function requireAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  const token = req.cookies?.[config.cookie.name]

  try {
    if (!token) {
      unauthorized()
    }

    const payload = jwt.verify(token, config.jwtSecret) as { userId: number }
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true },
    })

    if (!user) {
      unauthorized('Session expired')
    }

    req.userId = user.id
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, 'Invalid token'))
      return
    }

    next(error)
  }
}
