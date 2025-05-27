import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <div className="p-6 font-sans bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')] bg-repeat min-h-screen">
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-medium mb-8 text-center text-amber-500 underline decoration-wavy'>Pet Shop Inventory</h1>
        <Home></Home>
      </div>
    </div>
  );
}

export default App;
