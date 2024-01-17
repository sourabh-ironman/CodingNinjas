
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { CalendarView } from './components/CalendarView';
import { store } from './redux/store';

function App() {
  const router = createBrowserRouter([
    {path: '/',  element: <Header/>, children:[
      {path:'/', element: <Home/>},
      {path:'/calendarView', element: <CalendarView/>}
    ]}
  ])

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </div>
  );
}

export default App;
