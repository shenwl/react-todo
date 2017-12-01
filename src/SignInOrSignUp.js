import React, { Component } from 'react'
import SignUpForm from './SignUpForm' 
import SignInForm from './SignInForm' 

export default class SignInOrSignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signIn'
        }
    }
    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }
    render() {
        return (
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
                        <SignUpForm formData={this.props.formData}
                            onSubmit={this.props.onSignUp}
                            onChange={this.props.onChange}/>
                        : null}
                    {this.state.selected === 'signUp' ?
                        <SignInForm formData={this.props.formData}
                        onSubmit={this.props.onSignIn}
                        onChange={this.props.onChange}
                        onForgotPassword={this.props.onForgotPassword}/>
                        : null}
                </div>
            </div>
        )
    }

}
