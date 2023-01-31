import {
  decrement,
  increment,
  selectCount,
  useAppDispatch,
  useAppSelector,
} from "../src/store";

export const Header = () => {
  const count = useAppSelector(selectCount);
  return <p>Shopping cart :{count}</p>;
};

export const Content = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <p>
        <button onClick={() => dispatch(increment())}>Add 1 to cart</button>
      </p>
      <p>
        <button onClick={() => dispatch(decrement())}>
          Delete 1 from cart
        </button>
      </p>
    </>
  );
};

export default function Shopping() {
  return (
    <>
      <Header />
      <Content />
    </>
  );
}
