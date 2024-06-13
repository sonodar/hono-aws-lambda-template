import { Hono } from 'hono'

const basePath = process.env.BASE_PATH || '/'

export function createApp(): Hono {
    const app = new Hono()
    app.get(`${basePath}`, (c) => c.text('Hono on AWS Lambda!'))
    return app
}
