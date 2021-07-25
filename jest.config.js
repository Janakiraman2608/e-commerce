const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/ng-shop',
    '<rootDir>/apps/admin',
    '<rootDir>/libs/ui',
    '<rootDir>/libs/products',
    '<rootDir>/libs/users',
    '<rootDir>/libs/orders',
  ],
};
