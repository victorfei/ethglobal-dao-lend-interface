import { useForm } from 'react-hook-form';

type Inputs = {
  daoName: string,
  amount: number,
  paymentToken: string,
  maturityDate: string,
  interestRate: string
}

const paymentTokenOptions = [
  { text: 'USDC', }
];

export default function Borrow () {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <div className="grid grid-cols-2">
        Borrow popular ERC20 tokens at a fixed rate
      </div>
      <form className="m-10 max-w-xl" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 p-2">
          <label>
            <span className="text-gray-700">Dao Name</span>
          </label>
          <input
            type="text"
            id="text"
            className="form-input mx-2 rounded-md"
            { ...register('daoName', { required: true } )}
          ></input>
        </div>

        <div className="grid grid-cols-3 p-2">
          <label>
            <span className="text-gray-700">Amount</span>
          </label>

          <input
            type="number"
            id="number"
            className="form-input mx-2 rounded-md"
            { ...register('amount', { required: true, min: 0 } )}

          ></input>

          <select
            id="email"
            className="form-input mx-2 rounded-md"
            { ...register('paymentToken' )}
          ></select>
        </div>

        <div className="grid grid-cols-2 p-2">
          <label>
            <span className="text-gray-700">Maturity</span>
          </label>

          <input
            type="date"
            id="date"
            className="form-input mx-2 rounded-md"
            { ...register('maturityDate', { required: true } )}
          ></input>
        </div>

        <div className="grid grid-cols-2 p-2">
          <label>
            <span className="text-gray-700">Interest Rate</span>
          </label>

          <input
            type="number"
            id="number"
            className="form-input mx-2 rounded-md"
            { ...register('interestRate', { required: true } )}
          ></input>
        </div>

        <input className="submitButton" type="submit" ></input>
      </form>
    </>
  );
}