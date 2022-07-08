import { makeFileURL } from 'src/config';

export const payload = {
  id: 1,
  description: 'test plan',
  summary: null,
  productId: 1,
  prizeValue: 50,
  product: {
    id: 1,
    description: 'test product',
    branchGroupNumber: 1,
    branchNumber: 1,
    termsPDF: 'test.pdf',
  },
  planCoverage: [
    {
      id: 1,
      planId: 1,
      coverageId: 1,
      capitalValue: 50,
      generalText: null,
      capitalText: null,
      summaryText: null,
      shortageText: null,
      franchiseText: null,
      coverage: {
        id: 1,
        icon: 'test.jpg',
        title: 'test coverage',
        description: 'test coverage description',
        coverageTypeId: 1,
        coverageType: {
          id: 1,
          description: 'test type',
          key: 'test',
        },
      },
    },
  ],
};

export const domain = 'http://test:1234';

export const expected = {
  id: 1,
  prize_value: 50,
  description: 'test plan',
  summary: null,
  product: {
    id: 1,
    description: 'test product',
    terms_pdf: makeFileURL('test.pdf', domain),
  },
  coverages: [
    {
      description: 'test type',
      key: 'test',
      values: [
        {
          icon: makeFileURL('test.jpg', domain),
          title: 'test coverage',
          capital_value: 50,
          capital_text: null,
          general_text: null,
          summary_text: null,
          shortage_text: null,
          franchise_text: null,
        },
      ],
    },
  ],
};
