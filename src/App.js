import { AppContextProvider } from './context/index.js';

import {
    Head,
    ResultsSection,
} from "./components/index.js";

import './App.css';

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <Head />
                <ResultsSection />
            </AppContextProvider>
        </div>
    );
}

export default App;
