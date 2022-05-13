import BorrowForm from '@src/components/borrowForm';

export default function Borrow () {
  return (
    <div className="grid grid-cols-1">
      Borrow popular ERC20 tokens at a fixed rate
      <BorrowForm></BorrowForm>
    </div>
  );
}