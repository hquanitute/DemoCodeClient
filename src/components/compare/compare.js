import React, { Component } from 'react';
import Axios from 'axios';
import './../../style/main.css'
import { Button } from 'reactstrap';

let api = require('./../../api/api');

class Compare extends Component {
    constructor(props) {
        super(props);
        this.state = { question: "", result: false };
        this.changeAnswer = this.changeAnswer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentWillMount() {
        let url = api.apiBase+ 'comparejs';
        Axios.get(url).then(res => {
            let Res = res.data.question;
            this.setState({ question: Res });
        }).catch((err) => {
            console.log(err);
        })
    }

    changeAnswer(e) {
        this.setState({ question: e.target.value });
    }

    onSubmit(e) {
        let url = api.apiBase+'comparejs';
        Axios.post(url, { answer: this.state.question }).then(res => {
            this.setState({ result: res.data.result });
        });
    }

    render() {
        return (
            <div>
                <div>Write function to compare 2 number, return -1 when a smaller than b, 0 when a equal to b, 1 when a bigger than b</div>
                <textarea value={this.state.question} onChange={this.changeAnswer}></textarea>
                <div>
                    <Button onClick={this.onSubmit}>Submit</Button>
                </div>
                <div>Result: { this.state.result ? 'Correct' : 'Wrong'}</div>
            </div>
        );
    }
}

export default Compare;