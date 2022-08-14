import React from "react";

const GuessForm2 = ({onSubmit}) => {
    const guessRef = React.useRef();

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(guessRef.current.value)
    }

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <input className="GuessText" type="text" placeholder="enter your guess: " ref={guessRef} />
            </label>
            <input className="GuessButton" type="submit" value="guess" />
          </form>
        </div>
    );
}

export default GuessForm2;