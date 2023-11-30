export const onRequest: PagesFunction = async (context) => {
  const asset = await context.env.ASSETS.fetch('/projects')
  return new Response(asset.body, asset)
}
