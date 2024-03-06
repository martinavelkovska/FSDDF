import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store} ><App /></Provider>); //that's how we provide our Redux store to the entire app
