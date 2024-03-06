import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";


const cartSlice = createSlice({
    name:'cart',
    initialState: {
        items: [],  //cart items
        totalQuantity: 0, //of items in the cart, the quatnitity of the items of the array
        // totalAmount: 0
       changed:false,
    },
    reducers: {

        replaceCart(state, action) { //update the redux store with the lastest cart information
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
          },
        addItemToCart(state,action){ //this action should be disptached - we need to know which items should be added after all
            const newItem = action.payload;

            const existingItem = state.items.find((item) => item.id === newItem.id);

            state.changed=true;

            state.totalQuantity++;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        // addItemToCart(state, action) {
        //     const newItem = action.payload;
        
        //     // Add debugging logs
        //     console.log('State before:', state);
            
        //     const existingItem = state.items.find((item) => item.id === newItem.id);
            
        //     console.log('Existing item:', existingItem);
        
        //     state.totalQuantity++;
        
        //     if (!existingItem) {
        //         state.items.push({
        //             id: newItem.id,
        //             price: newItem.price,
        //             quantity: 1,
        //             totalPrice: newItem.price,
        //             name: newItem.title
        //         });
        //     } else {
        //         existingItem.quantity++;
        //         existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        //     }
        
        //     // Add debugging logs
        //     console.log('State after:', state);
        // },
        removeItemFromCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if(existingItem.quantity === 1){
                state.items = state.items.filter((item) => item.id !== id); // we keep all the items where IDs do not match the one ID
            } else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }

    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
