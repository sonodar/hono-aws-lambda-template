import type { GetParametersByPathCommandInput, Parameter } from '@aws-sdk/client-ssm'
import { GetParametersByPathCommand , SSMClient } from '@aws-sdk/client-ssm'

/**
 * パラメータストアからシークレットを読み込んでプロセスの環境変数にセットします。
 * これはアプリケーションの bootstrap フェーズで呼び出すことを想定しています。
 */
export async function setupRemoteParameters(parameterPath: string) {
  if (!parameterPath) {
    throw new Error('Parameter path is required')
  }

  const ssm = new SSMClient()

  for await (const parameter of getParametersByPath(ssm, parameterPath)) {
    const name = parameter.Name?.split('/').pop()

    if (name && parameter.Value) {
      process.env[name] = parameter.Value
    }
  }
}

async function* getParametersByPath(ssm: SSMClient, path: string, nextToken?: string): AsyncGenerator<Parameter> {
  const input: GetParametersByPathCommandInput = { Path: path, Recursive: true, WithDecryption: true, MaxResults: 10 }

  if (nextToken) {
    input.NextToken = nextToken
  }

  const { Parameters, NextToken } = await ssm.send(new GetParametersByPathCommand(input))

  if (!Parameters) {
    return
  }

  for (const parameter of Parameters) {
    yield parameter
  }

  if (NextToken) {
    yield* getParametersByPath(ssm, path, NextToken)
  }
}
