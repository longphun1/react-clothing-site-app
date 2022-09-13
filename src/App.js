import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';

const Shop = () => {
  return <h1> I am shop page</h1>
}
// Make navigation component to be parent of the shop and home components that renders the categories
// Index means it will render the component if it matches just the '/' path with nothing on it
// Clicking on the shop link in the nav component will send you to the /shop route and render the shop component
const App = () => {
  return (
    <Routes> 
      <Route path='/' element={ <Navigation/> }> 
        <Route index element={ <Home /> } />
        <Route path='shop' element={ <Shop/> } />
      </Route>
    </Routes>
  )
};

export default App;
