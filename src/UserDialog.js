import React, { Component } from 'react'
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import SignUpForm from './SignUpForm' 
import SignInForm from './SignInForm' 

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signIn', //'signUp'
            selectedTab: 'signInOrSignUp', //'forgotPassword'
            formData: {
                email: '',
                username: '',
                password: '',
            }
        }
    }
    switch(e) {
        this.setState({
            selected: e.target.value
        })
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
        let signInOrSignUp = (
            <div className="signInOrSignUp">
                <nav>
                    <label>
                        <input type="radio" value="signIn" 
                        checked={this.state.selected === 'signIn'} 
                        onChange={this.switch.bind(this)}/>登录
                    </label>
                    <label>
                        <input type="radio" value="signUp" 
                        checked={this.state.selected === 'signUp'}
                        onChange={this.switch.bind(this)} />注册
                    </label>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signIn' ? 
                        <SignUpForm formData={this.state.formData}
                            onSubmit={this.signUp.bind(this)}
                            onChange={this.changeFormData.bind(this)}/>
                        : null}
                    {this.state.selected === 'signUp' ?
                        <SignInForm formData={this.state.formData}
                        onSubmit={this.signIn.bind(this)}
                        onChange={this.changeFormData.bind(this)}
                        onForgotPassword={this.showForgotPassword.bind(this)}/>
                        : null}
                </div>
            </div>
        )
        let forgotPassword = (
            <div className="forgotPassword">
                <h3>重置密码</h3>
                <form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}>
                    <div className="row">
                        <label>邮箱</label>
                        <input type="test" value={this.state.formData.email}
                        onChange={this.changeFormData.bind(this, 'email')} />
                    </div>
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.returnToSignIn.bind(this)}>返回登录</a>
                    </div>
                </form>
            </div>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                   {this.state.selectedTab == 'signInOrSignUp' ? signInOrSignUp : forgotPassword}
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