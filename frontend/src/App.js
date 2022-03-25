import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

// Import necessary property from react alert to display alerts
import { useAlert } from 'react-alert';

// Import components
import Header from './components/layouts/Header'
import Home from './components/Home'
import Quiz from './components/quiz/Quiz'
import Login from './components/admin/Login'
import Admin from './components/admin/AdminLists'
import UpdateProject from './components/admin/UpdateProject'
import NewProject from './components/admin/NewProject'
import NewQuestion from './components/admin/NewQuestion'
import NotFound from './components/errors/404'

// We import the loadUser action function here in the App.js as it is the best place
// as we want to call it first on every page.
// We also must import the store in order to be able to dispatch the action function.
import { loadUser } from './actions/userActions';
import store from './store';

function App() {

    // We extract data from the store user with the useSelector hook,
    // To be passed in the front end and useEffect hook below
    const { loading, isAuthenticated, error } = useSelector(state => state.user);

    useEffect(() => {
        store.dispatch(loadUser())
    }, [])

    // Which ever route this function wraps around will have a header.
    const HeaderLayout = () => (
        <>
          <Header />
          <Outlet /> 
        </>
      );

    // Which ever route this function wraps around will be available only to authenticated users.
    const ProtectedRoute = () => {
        const alert = useAlert();

        // If error display alert
        if(error) {
            alert.error(error);
        }

        // If user is logged in display the outlet which corresponds to whichever routes this wraps,
        // otherwise redirect to login page.
        return (
            isAuthenticated ? <Outlet /> : <Navigate to='/login' />
        )
    }

    return (
        <BrowserRouter>
            <div className="App">
                {/* Routes */}
                <Routes>
                    {/* Routes with header */}
                    <Route element={<HeaderLayout />}>
                        <Route path='/' element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    {/* Routes without header */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/quiz' element={<Quiz />} />
                    {/* Protected routes */}
                    {loading === false &&
                        <Route element={<ProtectedRoute />}>
                            <Route path='/admin' element={<Admin />} />
                            <Route path='/admin/update/:id' element={<UpdateProject />} />
                            <Route path='/admin/newproject' element={<NewProject />} />
                            <Route path='/admin/newquestion' element={<NewQuestion />} />
                        </Route>
                    }
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
