# hono-aws-lambda-template

AWS Lambda で [Hono](https://hono.dev/) を実行するためのテンプレート。\
デプロイには SAM（aws-sam-cli） を利用していますが、SAM 依存のコードではないため
CDK や Terraform でもデプロイできます。

Hono の
[aws-lambda adapter](https://github.com/honojs/hono/tree/main/src/adapter/aws-lambda)
が素晴らしいで、これだけで API Gateway V2 だけでなく、ALB や 旧 API Gateway と連携して使えるようになります。（※）

> ※ `sam local invoke` には対応していません（2024/06 現在）

## 開発

```shell
npm run dev
```

## ビルド

```shell
sam validate --lint
sam build
```

## デプロイ

```shell
sam deploy --guided
```

## 環境変数設定

- `BASE_PATH`
  - ルーティングのルートパスを指定します。デフォルトは `/` です。
    既存の ALB にアタッチする場合など、パスルーティングする場合などに便利です。
