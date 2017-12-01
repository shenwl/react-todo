import AV from 'leancloud-storage'

var APP_ID = '1hHXSRgJD6DX1rrix26NV6tU-gzGzoHsz'
var APP_KEY = '5zG6GOCo5kC7IMLfDv3Kevdt'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

export function signUp (email, username, password, successFn, errorFn) {
    var user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.setEmail(email)

    user.signUp().then(function(loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function(error) {
        errorFn.call(null, error)
    })

    return undefined
}

export function signIn (username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function(loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function(error) {
        errorFn.call(null, error)
    })

}

export function signOut() {
    AV.User.logOut()
    return undefined
}

export function sendPasswordResetEmail(email. successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function(success) {
        successFn.call()
    }, function(error) {
        console.dir(error)
    })
}

function getUserFromAVUser(AVUser) {
    console.log()
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}

export function getCurrentUser() {
    let user = AV.User.current
    if(user) {
        return getUserFromAVUser(user)
    }else {
        return null
    }
}
