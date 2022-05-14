# Make sure you have done "nvm use v16.13.2" or install correpsonding npm version in your laptop
setup:	
	npm install

lint:
	npm run lint

run-test:
	npx hardhat test