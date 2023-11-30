export const onRequest: PagesFunction = async (context) => {
  const userAgent = context.request.headers.get('user-agent')
  console.log(userAgent)
  const asset = await context.env.ASSETS.fetch('/projects')
  return new Response(asset.body, asset)
}
