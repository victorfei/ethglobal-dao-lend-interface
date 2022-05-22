This is the mono-repo for the BondFi project. BondFi is a decenteralized bond issuer that allows bonds to be created by anyone. Currently, BondFi implements [zero coupon bonds](https://www.investopedia.com/terms/z/zero-couponbond.asp) as the main bond instrument. In future releases, we will allow a variety of bonds. 

## Contracts
The bond contracts use a factory pattern to create new bonds. Currently, the main contracts are BondFactory.sol and Bond.sol. 

The contract are deployed on Kovan:

BondFactory: [0xeCF51812d699B75EC85C554789B064B994419440](https://kovan.etherscan.io/address/0xecf51812d699b75ec85c554789b064b994419440)

## Getting Started

First, run the development server for the frontend:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Create a Bond
To create a bond, click on "I'm a DAO" on the front page. Fill in the required form and click "Submit"

## Purchase in a bond
To purchase a bond, click on "INVEST IN A DAO" on the front page or scroll down to the Bond listing table. Click "LENDING DETAILS", set the amount, and lend!

## Subgraphs
Subgraphs are used to create graphql API data located [here](https://thegraph.com/hosted-service/subgraph/ltyu/ethglobal-dao-lend-subgraph-repo?selected=playground)

