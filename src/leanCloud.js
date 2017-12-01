import AV from 'leancloud-storage'

var APP_ID = '1hHXSRgJD6DX1rrix26NV6tU-gzGzoHsz'
var APP_KEY = '5zG6GOCo5kC7IMLfDv3Kevdt'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

//所有Todo相关的leanCloud操作s
export const TodoModel = {
    getByUser(user, successFn, errorFn) {
        let query = new AV.Query('Todo')
        query.find().then((response) => {
            let arr = response.map((t) => {
                return {id: t.id, ...t.attributes}
            })
            successFn.call(null, arr)
        })
    },
    create({status, title, deleted}, successFn, errorFn) {
        var Todo = AV.Object.extend('Todo')
        var todo = new Todo()
        todo.set('title', title)
        todo.set('status', status)
        todo.set('deleted', deleted)
        todo.save().then(function (response) {
            successFn.call(null, response.id)
        }, function (error) {
            errorFn && errorFn.call(null, error)
        })

    },
    update() {

    },
    destroy() {

    },
}

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

export function sendPasswordResetEmail(email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function(success) {
        successFn.call()
    }, function(error) {
        errorFn.call(null, error)
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
