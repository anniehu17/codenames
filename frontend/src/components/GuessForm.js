import React from "react";

const GuessForm = ({onSubmit}) => {
    const guessRef = React.useRef();

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(guessRef)
    }

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <input className="GuessText" type="text" placeholder="Enter your guess" ref={guessRef} />
            </label>
            <input className="GuessButton" type="submit" value="Guess" />
          </form>
        </div>
    );
}

export default GuessForm;