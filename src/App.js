import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect, useState } from 'react';
// import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData,fetchCartData } from './store/cart-actions';


let isInitial = true;

function App() {

  const cartIsVisible =  useSelector(state => state.ui.cartIsVisible); // receive the current state automatically 

  //koga ke se promeni sostojbata na cart ke pratime HTTP request
  const cart = useSelector((state) => state.cart);

  const notification = useSelector((state) => state.ui.notification);
  const dispatch =  useDispatch();

  useEffect(() => { //dispatch whenever our app starts
    dispatch(fetchCartData());

  }, [dispatch]);

  useEffect(()=> { //this effect function re-executes whenever our cart changes
    // const sendCartData = async () => {
      // dispatch(uiActions.showNotification({
      //     status: 'pending',
      //     title: 'Sending',
      //     message: 'Sending cart data...',
      // }));

    //  const response = await fetch(
    //   "https://react-app-e481a-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
    //    {  // it will create a new cart Node in the database, and send a POST Request,
    //   method: 'PUT',
    //   body: JSON.stringify(cart),  // because that will tell FireBase to store new data, with PUT request we are overriding the existing cart data(new data won't be added in a list of data)
    //   }
    //   );

    //   if(!response.ok){
    //     throw new Error('Sending cart data failed.');
    //   }
    //   //i am not interested in any response
    //   // const responseData = await response.json(); // should show that success notification

    //   dispatch(uiActions.showNotification({
    //     status: 'success',
    //     title: 'Succedd!',
    //     message: 'Sent cart data',
    // }));


    // };

    if(isInitial){ // i will not continue i will not send my cart data
      isInitial = false;
      return;
    }

    // sendCartData().catch(error => {
    //   //   dispatch(uiActions.showNotification({
    //   //     status: 'error',
    //   //     title: 'Error!',
    //   //     message: 'Sending cart data failed!',
    //   // })
    //   // );
    // });


   if(cart.changed) { //not sending notification 
    
    dispatch(sendCartData(cart)); //we dispatched before action creators (functions that return an action object), now we dispatching function that returns another function

   }
  }, [cart, dispatch]);
  return (
    <Fragment>
     {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
     { cartIsVisible && <Cart /> }
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
