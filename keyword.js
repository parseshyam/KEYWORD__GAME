import React, { Component } from 'react'
export default class Justplay extends Component {
    state = {
        chat: '',
        keyword: '',
        /////// ALLOWED ////////
        allowed_keywords: ['samsung', 0, 'nokia', 0, 'asus', 0],
        allowed_array_count: 0,
        allowed_word_used: [],
        allowed_count: 0,
        allowed_percentage: 0.0,
        /////// PROBHITED ///////
        probhited_keywords: ['apple', 0, 'blackberry', 0],
        probhited_array_count: 0,
        probhited_count: 0,
        probhited_word_used: [],
        probhited_percentage: 0.0,
        /////////////////////////
    }

    check = () => {
        let {
            chat,
            /////// ALLOWED ///////
            allowed_count,
            allowed_keywords,
            allowed_word_used,
            allowed_percentage,
            /////// PROBHITED ///////
            probhited_count,
            probhited_keywords,
            probhited_word_used,
            probhited_percentage
        } = this.state;


        // if (chat !== '') {//&& allowed_count !== allowed_keywords.length / 2) {
        console.log('searching')
        for (let i = 0; i < allowed_keywords.length; i += 2) {
            if (chat.toLowerCase().includes(allowed_keywords[i].toLowerCase())) {
                console.log('MATCHED IN ALLOWED WORDS', this.state)
                if (allowed_keywords[i + 1] === 0) {
                    allowed_word_used.push(allowed_keywords[i]);
                    allowed_count += 1;
                }
                allowed_keywords[i + 1] += 1;
            }
        }

        for (let i = 0; i < probhited_keywords.length; i += 2) {
            if (chat.toLowerCase().includes(probhited_keywords[i].toLowerCase())) {
                console.log('MATCHED IN PROBHITED WORDS')
                if (probhited_keywords[i + 1] === 0) {
                    probhited_word_used.push(probhited_keywords[i])
                    probhited_count += 1;

                }
                probhited_keywords[i + 1] += 1;
            }
        }
        // }
        // else
        //     console.log('not searching')

        allowed_percentage = (100 / (allowed_keywords.length / 2)) * allowed_count;
        probhited_percentage = (100 / (probhited_keywords.length / 2)) * probhited_count;

        this.setState({
            chat: '',
            keyword: '',
            allowed_count,
            allowed_keywords,
            allowed_percentage,
            probhited_count,
            probhited_keywords,
            probhited_percentage
        }, () => {
            localStorage.setItem('state', JSON.stringify(this.state))
        })
    }

    assignValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    add_allowed_keyword = () => {
        if (this.state.keyword.trim() === '') {
            return;
        }
        if (this.state.allowed_keywords.includes(this.state.keyword)) {
            return alert('ALREADY ADDED  !');
        } else {
            this.setState(prevState => {
                return {
                    allowed_keywords: [...prevState.allowed_keywords, this.state.keyword, 0],
                }
            }, () => {
                this.check();
            })
        }
    }

    add_probhited_keyword = () => {
        if (this.state.keyword.trim() === '') {
            return;
        }
        if (this.state.probhited_keywords.includes(this.state.keyword)) {
            return alert('ALREADY ADDED  !');
        } else {
            this.setState(prevState => {
                return {
                    probhited_keywords: [...prevState.probhited_keywords, this.state.keyword, 0],
                }
            }, () => {
                this.check();
            })
        }
    }

    remove_allowed_keyword = (value, index) => {
        console.log(value);
        let {
            allowed_count,
            allowed_keywords,
            allowed_word_used,
        } = this.state;

        allowed_keywords.splice(index, 2);

        for (let i = allowed_word_used.length - 1; i >= 0; i--) {
            if (allowed_word_used[i] === value) {
                allowed_word_used.splice(i, 1);
                allowed_count -= 1;
            }
        }
        console.log()
        this.setState({
            allowed_keywords,
            allowed_word_used,
            allowed_count
        }, () => {
            this.check();
        })
    }

    remove_probhited_keyword = (value, index) => {
        console.log(value);
        let {
            probhited_count,
            probhited_keywords,
            probhited_word_used,
        } = this.state;

        probhited_keywords.splice(index, 2);

        for (let i = probhited_word_used.length - 1; i >= 0; i--) {
            if (probhited_word_used[i] === value) {
                probhited_word_used.splice(i, 1);
                probhited_count -= 1;
            }
        }
        console.log()
        this.setState({
            probhited_keywords,
            probhited_word_used,
            probhited_count
        }, () => {
            this.check();
        })
    }


    componentDidMount() {
        const state = localStorage.getItem('state');
        if (state) {
            this.setState(JSON.parse(state))
        }
    }

    render() {
        let {
            chat,
            keyword,
            /////// ALLOWED ////////
            allowed_count,
            allowed_keywords,
            allowed_word_used,
            allowed_percentage,
            /////// PROBHITED ///////
            probhited_count,
            probhited_keywords,
            probhited_word_used,
            probhited_percentage
        } = this.state;

        return (
            <>
                <div className="jumbotron">
                    <h1 className="display-4">Search, keyword !</h1>
                    <div className="input-group">
                        <input
                            type="text" className="form-control"
                            name="chat"
                            onChange={this.assignValue}
                            value={chat} placeholder="Search keywords."
                            aria-label="ADD KEYWORD"
                            aria-describedby="button-addon2" />

                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={this.check} type="button" id="button-addon2">SEARCH IN ALLOWED OR PROBHITED KEYWORDS.</button>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div >
                        <p>ADD KEYWORDS.</p>
                        <div className="input-group">
                            <input type="text" className="form-control" name="keyword" placeholder="Add keyword in allowed or probhited." onChange={this.assignValue} value={keyword} />
                            <div className="input-group-append" id="button-addon4">
                                <button onClick={this.add_allowed_keyword} className="btn btn-outline-secondary" type="button">ADD IN ALLOWED KEYWORD</button>
                                <button onClick={this.add_probhited_keyword} className="btn btn-outline-secondary" type="button">ADD IN PROBHITED KEYWORD</button>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div>
                        <h3><p className="display-5 text-success">ALLOWED KEYWORDS.</p></h3>
                        {allowed_keywords.map((value, index) => (
                            <>
                                {index % 2 === 0 ?
                                    <div className="border border-success m-1 p-1" key={index} style={{ display: "inline-block", borderRadius: "10px" }}>
                                        <button
                                            className="badge badge-pill badge-danger"
                                            onClick={() => { this.remove_allowed_keyword(value, index) }}
                                        >X</button>
                                        <button type="button" className="btn btn-primary m-1">
                                            {value} <span className="badge badge-light">{allowed_keywords[index + 1]}</span>
                                        </button>
                                    </div> : null}
                            </>
                        ))}
                    </div>
                    <h5 className="display-6 m-2">{`USED : ${allowed_count} OUT OF ${allowed_keywords.length / 2}`}</h5>
                    <h5 className="display-6 m-2 ">WORD USED : {allowed_word_used.map(word => <span key={word} className="badge badge-secondary m-2">{word}</span>)}</h5>
                    <h4 className="display-6 m-2">{`PERCENTAGE USED : ${allowed_percentage} %`}</h4>
                    <hr className="my-4" />
                    <div>
                        <h3><p className="display-5 text-danger">PROBHITED KEYWORDS.</p></h3>
                        {probhited_keywords.map((value, index) => (
                            < >
                                {index % 2 === 0 ?
                                    <div className="border border-danger m-1 p-1" key={index} style={{ display: "inline-block", borderRadius: "10px" }}>
                                        <button
                                            className="badge badge-pill badge-danger"
                                            onClick={() => { this.remove_probhited_keyword(value, index) }}
                                        >X</button>
                                        <button
                                            type="button"
                                            className="btn btn-primary m-1"
                                        >
                                            {value} <span className="badge badge-light">{probhited_keywords[index + 1]}</span>
                                        </button>
                                    </div> : null}
                            </>
                        ))}

                    </div>
                    <h5 className=" m-2">{`USED : ${probhited_count} OUT OF ${probhited_keywords.length / 2}`}</h5>
                    <h5 className="display-6 m-2">WORD USED : {probhited_word_used.map(word => <span key={word} className="badge badge-secondary m-2">{word}</span>)}</h5>
                    <h4 className="display-6 m-2">{`PERCENTAGE USED : ${probhited_percentage} %`}</h4>
                </div>
            </>
        )
    }
}

