import { AppContextProvider } from './context/index.js';

import {
    Body,
    ResultsSectionItemModal,
} from "./components/index.js";

import './App.css';

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <Body />
                <ResultsSectionItemModal />
            </AppContextProvider>
        </div>
    );
}

export default App;
