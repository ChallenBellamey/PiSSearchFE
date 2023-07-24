import { AppContextProvider } from './context/index.js';

import {
    Head,
} from "./components/index.js";

import './App.css';

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <Head />
            </AppContextProvider>
        </div>
    );
}

export default App;
