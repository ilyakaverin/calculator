make start:
	npx parcel src/index.html
make jest:
	node --experimental-vm-modules node_modules/jest/bin/jest.js
make lint:
npx eslint src/
