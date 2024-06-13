import type { LambdaContext, LambdaEvent } from 'hono/aws-lambda'
import { handle } from 'hono/aws-lambda'
import { setupRemoteParameters } from './src/aws/parameter-store'
import { createApp } from './src/app'

const parameterPath = process.env.AWS_SSM_PARAMETER_PATH
let isParametersLoaded = false

let lambdaHandler: ReturnType<typeof handle> | null = null

export const handler = async (event: LambdaEvent, lambdaContext: LambdaContext) => {
    if (parameterPath && !isParametersLoaded) {
        await setupRemoteParameters(parameterPath)
        isParametersLoaded = true
    }
    if (lambdaHandler === null) {
        lambdaHandler = handle(createApp())
    }
    return await lambdaHandler(event, lambdaContext)
}
