import { Hono } from 'hono'

const app = new Hono()

export const basePath = process.env.BASE_PATH || '/'

app.get(`${basePath}`, (c) => c.text('Hono on AWS Lambda!'))

export default app
