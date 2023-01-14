import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0,
        tags: ['tag1', 'tag2', 'tag3'],
    }

    styles = {
        fontSize: '1px',
        fontweight: 'bold',
    }

    // constructor() {
    //     super();
    //     this.handleIncrement = this.handleIncrement.bind(this);
    // }

    handleIncrement = (product) => {
        console.log(product);
        this.setState({ count: this.state.count + 1 });
    }

    // dohandleIncrement = () => {
    //     this.handleIncrement({ id: 1 });
    // }

    render() {
        let classes = this.getBadgeClasses();
        return (
            <div className="p-2">

                <div className="p-2"><span /*style={this.styles}*/ style={{ fontSize: 12 }} className={classes}>{this.formCount()}</span></div>


                <div className="p-2"> <button onClick={() => this.handleIncrement({ id: 1 })} className="btn btn-success btn-sm align-self-center">Increment</button></div>

                <ul className="list-group col-sm-3 pt-2">
                    {this.state.tags.map(tag => <li className="list-group-item" key={tag}>{tag}</li>)}
                </ul>
            </div>
        );
    }
    getBadgeClasses() {
        let classes = "align-self-center badge bg-";
        classes += this.state.count === 0 ? "warning" : "primary";
        return classes;
    }

    formCount() {
        const { count } = this.state;
        return count === 0 ? 'Zero' : count;
    }
}

export default Counter;