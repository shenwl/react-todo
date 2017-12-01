import React, { Component } from 'react'

export default class TodoItem extends Component {
    render() {
        return (
            <div>
                <input type="checkbox" checked={this.props.todo.status === 'completed'}
                    onChange = {this.props.onToggle} />{this.props.todo.title}
                <button onClick={this.props.onDelete}>删除</button>
            </div>       
        )
    }
    toggle(e) {
        this.props.onToggle(e, this.props.todo)
    }
    delete(e) {
        this.props.onDelete(e, this.props.todo)
    }
}