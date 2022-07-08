export const expected = {
  id: 1,
  description: null,
  summary: 'Plano 1',
  productId: 1,
  prizeValue: 9.99,
  product: {
    id: 1,
    description: 'Produto 01',
    branchGroupNumber: 1,
    branchNumber: 1,
  },
  planCoverage: [
    {
      id: 1,
      planId: 1,
      coverageId: 1,
      capitalValue: 3000,
      generalText: null,
      capitalText: null,
      summaryText: null,
      shortageText: null,
      franchiseText: null,
      coverage: {
        id: 1,
        icon: null,
        title: 'teste 01',
        description: null,
        coverageTypeId: 1,
        coverageType: {
          id: 1,
          description: 'Assitencia',
          key: 'support',
        },
      },
    },
  ],
};
