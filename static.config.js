export default {
  siteRoot: 'https://gitgarden.io',
  plugins: [
    'react-static-plugin-emotion',
    'react-static-plugin-typescript',
    'react-static-plugin-sass'
  ],
  getSiteData: () => ({
    title: 'Git Garden'
  }),
  getRoutes: () => [
    {
      path: '404',
      component: 'src/not-found'
    },
    {
      path: '/',
      component: 'src/landing'
    },
    {
      path: '/challenge',
      component: 'src/challenge'
    },
    {
      path: '/*',
      component: 'src/garden-page'
    }
  ]
}
