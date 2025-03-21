import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './styles/index.css';
import Projects from './routes/projects/page';
import { Protected } from './components/guard/protected.guard';
import RootLayoutWrapper from './components/layout/root-wrapper.layout';

function App() {
    return (
        <>
            <Routes>
                {/* <Route path="/sign-in" element={<SignInPage />} /> */}

                <Route element={<Protected />}>
                    <Route element={<RootLayoutWrapper />}>
                        <Route path="/" element={<Projects />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
