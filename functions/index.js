const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.createUserPage = functions.database.ref('/users/{uid}/')
  .onCreate(event => {
    // Grab the current value of what was written to the Realtime Database.
    const { subDomain, photoUrl, name } = event.data.val()
    const uid = event.auth.variable ? event.auth.variable.uid : null
    console.log('Data: ', subDomain, photoUrl, name, uid)
    if (!uid) return
    // return promise
    return admin
      .database()
      .ref(`/pages/${subDomain}`)
      .set({
        'pageData': {
          'contentList': {

          },
          'displayName': name,
          'externalLinks': {
            'linkList': [

            ]
          },
          'headShot': {
            'url': photoUrl
          },
          'shortBio': ''
        },
        'uid': uid
      })
  })
