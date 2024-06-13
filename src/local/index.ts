import { serve } from '@hono/node-server'
import { createApp } from '../app'
serve(createApp())
