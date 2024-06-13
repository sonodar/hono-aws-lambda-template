# hono-aws-lambda-template

AWS Lambda で [Hono](https://hono.dev/) を実行するためのテンプレート。\
最大の特徴として、Parameter Store から設定を取得することができます。

デプロイには SAM（aws-sam-cli） を利用していますが、SAM 依存のコードではないため
CDK や Terraform でもデプロイできます。

Hono の
[aws-lambda adapter](https://github.com/honojs/hono/tree/main/src/adapter/aws-lambda)
が素晴らしく、これだけで API Gateway V2 だけでなく、ALB や 旧 API Gateway と連携して使えるようになります。（※）

> ※ `sam local invoke` には対応していません（2024/06 現在）

## 開発

```shell
npm run dev
```

## デプロイ

```shell
sam validate --lint
sam build
sam deploy --guided
```

### パラメータストアでの設定

AWS Systems Manager の Parameter Store から設定を取得することができます。\
パラメータを取得するためには、環境変数 `AWS_SSM_PARAMETER_PATH` を設定してください。

パラメータ名の最後の部分が環境変数名になります。\
例えば、`/hono/adapter/lambda/VARIABLE` というパラメータがある場合、
`AWS_SSM_PARAMETER_PATH` に `/hono/adapter/lambda/` を設定することで、
`VARIABLE` という環境変数が設定されます。

## 環境変数設定

- `BASE_PATH`
  - ルーティングのルートパスを指定します。デフォルトは `/` です。
    既存の ALB にアタッチする場合など、パスルーティングする場合などに便利です。
