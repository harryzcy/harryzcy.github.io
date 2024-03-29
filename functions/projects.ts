export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url)

  const userAgent = context.request.headers.get('user-agent')
  const gptUsers = ['GPTBot', 'ChatGPT-User']
  if (userAgent && gptUsers.some((user) => userAgent.includes(user))) {
    console.log('GPT system detected, responding with projects.yaml')
    url.pathname = '/projects.yaml'
  }

  return await context.env.ASSETS.fetch(url)
}
