import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0,
        tags: ['tag1', 'tag2', 'tag3'],
    };
    renderTags() {
        if (this.state.tags.length === 0) return <p>There are no tags!</p>;
        return <ul className="list-group col-sm-3 p-2">{this.state.tags.map(tag => <li className="list-group-item" key={tag}>{tag}</li>)}</ul>;
    }
    render() {
        return (
            <div>
                {this.state.tags.length === 0 && "Please create a new tag!"}
                {this.renderTags()}
            </div>
        );
    }
}

export default Counter;