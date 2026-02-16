import jwt from 'jsonwebtoken'
export const createAccessToken = ( userId: string, tokenVersion: number ) => {
    const payload = {sub: userId, tokenVersion}
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: '30m'
    })
}

export const createRefreshToken = (userId: string, tokenVersion: number)=> {
    const payload = {sub: userId, tokenVersion}
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: '7d'
    })
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
        sub: string
        tokenVersion: number
    }
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
        sub: string
        tokenVersion: number
    }
}