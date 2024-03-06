import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";



//creating action creators:



export const fetchCartData = () => {

    return async dispatch => {    
        const fetchData = async() => {
            const response = await fetch( "https://react-app-e481a-default-rtdb.europe-west1.firebasedatabase.app/cart.json");

            if(!response.ok){
                throw new Error("Could not fetch cart data!");
            }
            const data = await response.json();

            return data;
        };
        try {
        const cartData =   await  fetchData();
        dispatch(cartActions.replaceCart({
            items: cartData.items || [], //items be undefined
            totalQuantity: cartData.totalQuantity

        }));// cart data has the correct structore because of the PUT method

        }catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!',
            })
            );
        }
    };
};


export const sendCartData = (cart) => { //for sending data
    return async (dispatch) => {
       dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending',
            message: 'Sending cart data...',
        })
        );
        const sendRequest = async () => { //for handling potenital errors
            const response = await fetch(
                "https://react-app-e481a-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
                 {  // it will create a new cart Node in the database, and send a POST Request,
                method: 'PUT',
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),  // because that will tell FireBase to store new data, 
                ///with PUT request we are overriding the existing cart data(new data won't be added in a list of data)
                }
                );
          
                if(!response.ok){
                  throw new Error('Sending cart data failed.');
                }
                //i am not interested in any response
                // const responseData = await response.json(); // should show that success notification
        };

        try{
        await sendRequest(); //await becuase is an async function it returns a promise
        dispatch(uiActions.showNotification({
            status: 'success',
            title: 'Succedd!',
            message: 'Sent cart data',
        })
        );
        } catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!',
            })
            );
        }        
      
    } // acction creator which does not return action object but returns another function
};
