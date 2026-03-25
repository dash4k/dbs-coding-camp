import React from 'react';

class ContactInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            tag: '',
        }

        this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this);
        this.onTagChangeEventHandler = this.onTagChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onNameChangeEventHandler(e) {
        this.setState(() => {
            return {
                name: e.target.value
            }
        });
    }

    onTagChangeEventHandler(e) {
        this.setState(() => {
            return {
                tag: e.target.value
            }
        });
    }

    onSubmitEventHandler(e) {
        e.preventDefault();
        this.props.addContact(this.state);
    }
    
    render() {
        return (
            <form className="contact-input" onSubmit={this.onSubmitEventHandler}>
                <input type="text" placeholder='Nama' value={this.state.name} onChange={this.onNameChangeEventHandler} />
                <input type="text" placeholder='Tag' value={this.state.tag} onChange={this.onTagChangeEventHandler}/>
                <button type="submit">Tambah</button>
            </form>
        )
    }
}

export default ContactInput;