import React from 'react';
import './index.css';

export default class Question1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState()
        this.handleScriptLoad = this.handleScriptLoad.bind(this)
        this.autocomplete = null
    }

    initialState() {
        return {
            city: '',
            query: '',
        }
    }

    handleScriptLoad = () => {
        const options = {
            types: ['(cities)']
        }

        /*global google*/
        const autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'), options);
        autocomplete.setFields(['address_components', 'formatted_address']);
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log(place);
            const address = place.address_components;

            if (address) {
                this.setState({
                    city: address[0].long_name,
                    query: place.formatted_address,
                })
                console.log(this.state);
            }

            const startpoint = this.state.query;
            this.props.setLocation('startpoint', startpoint);
        })

    }

    nextQuestion = (event) => {
        if (!this.props.values.startpoint) {
            window.alert("Please enter a startpoint");
            return;
        }
        event.preventDefault();
        this.props.nextStep();
    }

    render() {
        // const { values } = this.props;
        return (
            <div className="row" id="q1">
                <form className="col-sm-12 header bg-q">
                    <h3>Where are you starting from?</h3>
                    <input id="autocomplete"
                        placeholder="Search cities"
                        onChange={this.handleScriptLoad}
                    />
                </form>
                <button className="next" onClick={this.nextQuestion}><i className="fas fa-angle-right fa-2x i-btn-style"></i></button>
            </div>
        )
    }

}