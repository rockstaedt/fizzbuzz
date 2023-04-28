import styles from "@styles/Home.module.css";

import Head from "next/head";
import {useRef, useState} from "react";

export const EMPTY_RESULT_HINT = "Geben Sie einen Werte > 1 ein in das Formular ein.";
export const ERROR_TEXT = "Fehler! Es muss eine Zahl größer 0 eingegeben werden.";

function Home(props) {
    const inputRef = useRef(null);
    const [results, setResults] = useState(getResultsFrom(props.value));
    const [err, setErr] = useState("");

    const handleClick = () => {
        const target = inputRef.current.value;
        if (target <= 0) {
            setErr(ERROR_TEXT);
            return;
        }

        setResults(getResultsFrom(target));
    };

    return (
        <>
            <Head>
                <title>Bewerber-Quiz - FizzBuzz - Autohaus König</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>FizzBuzz - Bewerber Quiz</h1>

                <label>
                    <span>Zielnummer</span>
                    <input ref={inputRef} onFocus={() => setResults([])}/>
                    {err && <span className="error-text">{err}</span>}
                </label>

                <button onClick={handleClick}>Generieren (heimlicher Fehler)</button>

                <div className="result">
                    {results.length === 0 && EMPTY_RESULT_HINT}
                    {results.length > 0 && results.map(result => <li key={result}>{result}</li>)}
                </div>
            </main>
        </>
    );
}

export default Home;


///////////////////////////////

function getResultsFrom(target) {
    let tmpResults = [];

    for (let i = 1; i <= target; i++) {
        let val = i;
        if (i % 3 === 0) {
            val = "Fizz";
        }
        if (i % 5 === 0) {
            val = "Buzz";
        }
        if (i % 3 === 0 && i % 5 === 0) {
            val = "FizzBuzz";
        }

        tmpResults.push(val);
    }

    return tmpResults;
}
