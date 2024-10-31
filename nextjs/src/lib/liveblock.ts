import { Liveblocks } from '@liveblocks/node'

const key = process.env.LIVEBLOCKS_SECRET_KEY!
if (!key) {
    throw new Error('Missing LIVEBLOCKS_SECRET_KEY')
}



export const liveblocks = new Liveblocks({
    secret: key,
})