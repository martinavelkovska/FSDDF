import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
  const { title, price, description, id } = props;

  // const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();


  // const addToCartHandler = () => {
  // //   const newTotalQuantity = cart.totalQuantity + 1;  //ne treba da pisuvame: cart.totalQuantity = cart.totalQuantity + 1;

  // //   const updatedItems = cart.items.slice(); //Kopirame items od cart so slice method sto kreira nova niza so postoeckite objekti
  // //   const existingItem = updatedItems.find((item) => item.id === id); //go dobivam postoeckiot item so id

  // //   if(existingItem){
  // //     const updatedItem = {...existingItem}; //copy object into a new object as well, so that updated item is a brand new object in memory, without manipulating redux store, zatoa pravime kopija
  // //     updatedItem.quantity++;
  // //     updatedItem.price = updatedItem.price + price;
  // //     const existingItemIndex = updatedItems.findIndex((item) => item.id === id); //find index of the existing item
  // //     updatedItems[existingItemIndex] = updatedItem;
  // //   }
  // //   else{ //if we didn't have the item as part of the cart befor i push a brand new object to my updatedItems array
  // //     updatedItems.push({
  // //       id: id,
  // //       price: price,
  // //       quantity: 1,
  // //       totalPrice: price,
  // //       name: title,
  // //     });


  // //   }

  // //   const newCart = {
  // //     totalQuantity: newTotalQuantity,
  // //     items: updatedItems,
  // //   }


  // // dispatch(cartActions.replaceCart(newCart));
  // }

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({
      id, 
      title,
      price,
    }));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;


