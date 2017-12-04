import React, { Component } from 'react'
import './css/UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import ForgotPasswordForm from './ForgotPasswordForm' 
import SignInOrSignUp from './SignInOrSignUp' 

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp', //'forgotPassword'
            formData: {
                email: '',
                username: '',
                password: '',
            }
        }
    }
    signUp(e) {
        e.preventDefault()
        let {email, username, password} = this.state.formData
        let success = (user) => {
            this.props.onSignUpOrSignIn.call(null, user)
        }
        let error = (error) => {
            switch(error.code) {
                case 202:
                    alert('用户名已被占用')
                    break
                case 217:
                    alert('无效的用户名，不允许空白用户名')
                    break
                case 218:
                    alert('无效的密码，不允许空白密码')
                    break
                case 125:
                    alert('电子邮箱地址无效')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signUp(email, username, password, success, error)
    }
    signIn(e) {
        e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user) => {
            this.props.onSignUpOrSignIn.call(null, user)
        }
        let error = (error) => {
            switch(error.code) {
                case 201:
                    alert('没有提供密码，或者密码为空')
                    break
                case 210:
                    alert('用户名与密码不匹配')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username, password, success, error)
    }
    changeFormData(key, e) {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render() {
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                   {this.state.selectedTab === 'signInOrSignUp' ?
                        <SignInOrSignUp
                            formData={this.state.formData}
                            onSignIn={this.signIn.bind(this)}
                            onSignUp={this.signUp.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onForgotPassword={this.showForgotPassword.bind(this)}
                        />: 
                        <ForgotPasswordForm
                            formData={this.state.formData}
                            onSubmit={this.resetPassword.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onSignIn={this.returnToSignIn.bind(this)}
                        />
                    }
                </div>
            </div>
        )
    }
    deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
    showForgotPassword() {
        let stateCopy = this.deepCopy(this.state)
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    returnToSignIn() {
        let stateCopy = this.deepCopy(this.state)
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    resetPassword(e) {
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
}