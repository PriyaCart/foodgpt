import './App.css';
import FoodItems from './components/foodItems/FoodItems';
import MenuItems from './components/menuItems/MenuItems';
import 'bootstrap/dist/css/bootstrap.css'; 
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
       <FoodItems />
     
       {/* <MenuItems /> */}
    </div>
  );
}

export default App;
