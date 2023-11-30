export const onRequest: PagesFunction = async (context) => {
  const userAgent = context.request.headers.get('user-agent')
  console.log(userAgent)

  const url = new URL(context.request.url)
  const asset = await context.env.ASSETS.fetch(url)
  return new Response(asset.body, asset)
}
