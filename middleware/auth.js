export default function (app) {
  // If the user is authenticated
  if (app.$cookies.get('userdata')) {
    app.userData = app.$cookies.get('userdata')
    if (!app.userData.id) {
      return app.redirect('/login')
    }
  } else {
    return app.redirect('/login')
  }
}
