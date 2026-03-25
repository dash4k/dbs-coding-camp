import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      message: ''
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const newTitle = event.target.value;
    if (newTitle.length > 50) return;
    this.setState(() => {
      return {
        title: newTitle
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    if (this.state.body.length < 10) {
      this.setState(() => {
        return {
          message: 'Catatan kurang dari 10 karakter!'
        };
      });
      return;
    }
    else {
      this.props.addNote({ ...this.state });
      this.setState(() => {
        return {
          title: '',
          body: '',
          message: ''
        };
      });
    }
  }

  render() {
    const remainingChars = 50 - this.state.title.length;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {this.state.message && <p className="note-input__feedback--error">{this.state.message}</p>}
        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          {remainingChars < 10 ? <p className="note-input__feedback--error">Sisa karakter kurang dari 10!</p> : null}
          <p
            className="note-input__title__char-limit"
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
