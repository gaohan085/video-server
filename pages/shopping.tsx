import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export interface Action {
  type: string;
  payLoad: number;
}

// export const incrementCount = (inc: number) => {
//   return { type: 'increment', payLoad: inc };
// };

// export const decrementCount = (dec: number) => {
//   return { type: 'decrement', payLoad: dec };
// };

export interface ShoppingCartState {
  count: number;
}

let initialState: ShoppingCartState = { count: 0 };

// export const shoppingCartReducer = (state = initialState, action: Action) => {
//   switch (action.type) {
//     case 'increment':
//       return { ...state, count: state.count + action.payLoad };
//     case 'decrement':
//       return { ...state, count: state.count - action.payLoad };
//     default:
//       return state;
//   }
// };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementCount: (state) => {
      state.count += 1;
    },
    decrementCount: (state) => {
      state.count -= 1;
    },
  },
});

export const { incrementCount, decrementCount } = cartSlice.actions;

export const makeStore = () => {
  return configureStore({
    reducer: { cart: cartSlice.reducer },
  });
};

export const store = makeStore();
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export const Header = () => {
  const count = useSelector((state: ShoppingCartState) => state.count);
  console.log(count);
  return <p>Shopping cart :{count}</p>;
};

export const Content = () => {
  const dispatch = useDispatch();

  return (
    <>
      <p>
        <button onClick={() => dispatch(incrementCount())}>Add 1 to cart</button>
      </p>
      <p>
        <button onClick={() => dispatch(decrementCount())}>Delete 1 from cart</button>
      </p>
    </>
  );
};

export default function () {
  return (
    <>
      <Header />
      <Content />
    </>
  );
}
