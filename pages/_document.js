import Document, { Head, Main, NextScript } from 'next/document'
import styled, { ServerStyleSheet } from 'styled-components'

const Root = styled.div`height: 100vh;`
const Html = styled.html`overflow-y: unset;`

export default class CustomDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <Html lang="zh-CN">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, maximum-scale=1.0, minimum-scale=1.0"
          />
          <link rel="stylesheet" href="/static/fa/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/static/bulma/bulma.min.css" />
          {styleTags}
        </Head>
        <body>
          <Root>
            {main}
          </Root>
          <NextScript />
        </body>
      </Html>
    )
  }
}
