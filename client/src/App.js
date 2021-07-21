import { useState, useEffect } from 'react';
import './App.css';

const initialGenerate = {
  character: 5,
  simbols: true,
  numbers: true,
  uppercase: true,
};

const url = 'http://localhost:5000/generate';

function App() {
  const [numberCharacters, setNumberCharacters] = useState(5);
  const [options, setOptions] = useState(initialGenerate);
  const [password, setPassword] = useState();

  const increment = (e) => {
    setNumberCharacters(numberCharacters + 1);
    setOptions({ ...options, character: numberCharacters + 1 });
  }

  const decrement = (e) => {
    if (numberCharacters >= 5) {
      setNumberCharacters(numberCharacters - 1);
      setOptions({ ...options, character: numberCharacters - 1 });
    }
  }

  const handleChange = (e) => {
    setOptions({ ...options, [e.target.id]: !options[e.target.id] });
  };

  const generatePassword = async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });

    return res.json();
  };

  useEffect(() => {
    generatePassword()
      .then(pwd => setPassword(pwd.password));
  }, []);

  const handleGenerate = () => {
    if (options.character >= 5) {
      generatePassword()
        .then(pwd => setPassword(pwd.password));
    }
  }

  return (
    <div>
      <div className="card">
        <section className="card-title">
          <h1>DavaDev</h1>
          <h4>Password Generator</h4>
        </section>

        <section className="card-body">
          <div>
            <label htmlFor="characters">Número de caracteres: </label>
            <div className="inputNumeric">
              <div>
                <button className="btn" id="btn-decrement" onClick={decrement}><i className="fas fa-minus"></i></button>
              </div>
              <div>
                <input type="text" id="numerber-characters" readOnly value={numberCharacters} />
              </div>
              <div>
                <button className="btn" id="btn-increment" onClick={increment}><i className="fas fa-plus"></i></button>
              </div>
            </div>
          </div>
          {options.character < 5 ? (
            <span style={{ marginBottom: "5px", color: "red" }}>5 números minimos de caracteres </span>
          ) : ''}
          <br />

          <div>
            <label htmlFor="">¿Incluir Simbolos?</label>
            <button className="btn" id="simbols" onClick={handleChange}>
              <i className={`fas ${options.simbols ? 'fa-check' : 'fa-times'}`}></i>
            </button>
          </div>
          <br />

          <div>
            <label htmlFor="">¿Incluir Números?</label>
            <button className="btn" id="numbers" onClick={handleChange}>
              <i className={`fas ${options.numbers ? 'fa-check' : 'fa-times'}`}></i>
            </button>
          </div>
          <br />

          <div>
            <label htmlFor="">¿Incluir Mayusculas?</label>
            <button className="btn" id="uppercase" onClick={handleChange}>
              <i className={`fas ${options.uppercase ? 'fa-check' : 'fa-times'}`}></i>
            </button>
          </div>
          <br />

          <div>
            <button type="submit" className="btn" id="btn-generate" onClick={handleGenerate} value="Generar">Generar <i className="fas fa-lock"></i></button>

            <input type="text" id="input-password" value={password} />
          </div>
          <br />
        </section>
      </div>
    </div>
  );
}

export default App;
