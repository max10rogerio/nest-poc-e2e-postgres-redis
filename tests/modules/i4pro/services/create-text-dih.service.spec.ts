import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import { I4proModule } from 'src/modules/i4pro/i4pro.module';
import { CreateTextDIHService, CreateTextDIHServiceParams } from 'src/modules/i4pro/services';

describe('CreateTextDIHService (Unit)', () => {
  let createTextDIHService: CreateTextDIHService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [I4proModule],
      providers: [{ provide: CreateTextDIHService, useClass: CreateTextDIHService }],
    }).compile();

    createTextDIHService = await app.resolve<CreateTextDIHService>(CreateTextDIHService);
  });

  it('should return a formated responde', async () => {
    const mock: CreateTextDIHServiceParams = {
      shippingDate: '20220513',
      shippingNumber: '001314',
      insurerCode: 2968,
      contractNumber: '0506540314',
      sales: [
        {
          recordSequence: 1,
          contractPlan: 1,
          ticketNumber: 14000720873,
          cpfCnpj: 5836407100,
          contractorName: 'WEBWESON GONCALVES OLIVEIRA',
          dateBirthFoundation: '19950612',
          sex: 'M',
          maritalStatus: 'S',
          address: 'RUA ANGATU Q 3 L 4',
          complement: 'ABAIXO GARAGEM PREFEITURA',
          district: 'SETOR SANTA PAULA',
          city: 'PORANGATU',
          cep: 76550000,
          uf: 'GO',
          ddd: '0062',
          phone: 98297949,
          moduleNumber: '0001',
          valueAward: '000000000000990',
          contractDate: '20220328',
          installmentValue: '001799',
          installmentAmount: 12,
          installmentDueFirst: '20220328',
          amountCollected: '000000000000990',
          dueDate: '20220328',
          collectionDate: '20220328',
          operationDate: '20220328',
          lotRaffle: '02',
          luckyNumber: '13842',
        },
      ],
      trailer: [
        {
          totalRecorsSent: '000000002',
        },
      ],
    };
    const result = await createTextDIHService.createTextDIH(mock);

    const date = dayjs(mock.shippingDate).format('YYYYMMDD');
    const whiteSpace = ' ';
    const whiteSpaceOneHeader = whiteSpace.repeat(24);
    const whiteSpaceTwoHeader = whiteSpace.repeat(1946);
    const whiteSpaceOneSales = whiteSpace.repeat(10);
    const whiteSpaceRGSales = whiteSpace.repeat(34);

    const whiteSpaceContractorName = mock.sales[0].contractorName.padEnd(50, ' ');
    const whiteSpaceAddress = mock.sales[0].address.padEnd(70, ' ');

    const totalComplement = (mock.sales[0].complement || '').padEnd(70, ' ');

    const totalDistrict = mock.sales[0].district.padEnd(25, ' ');

    const totalCity = mock.sales[0].city.padEnd(35, ' ');

    const whiteSpaceTwoSales = whiteSpace.repeat(26);

    const whiteSpaceFiveSales = whiteSpace.repeat(20);

    const whiteSpaceTenSales = whiteSpace.repeat(2);
    const contractDate = dayjs(mock.sales[0].contractDate).format('YYYYMMDD');

    const repeatZero = '0';
    const sellersman = repeatZero.repeat(10);
    const branch = repeatZero.repeat(10);

    const installmentDue = dayjs(mock.sales[0].installmentDueFirst).format('YYYYMMDD');

    const whiteSpaceElevenSales = whiteSpace.repeat(5);
    const whiteSpaceTwelveSales = whiteSpace.repeat(20);
    const whiteSpaceThirteenSales = whiteSpace.repeat(4);

    const dateDue = dayjs(mock.sales[0].dueDate).format('YYYYMMDD');
    const dateCollection = dayjs(mock.sales[0].collectionDate).format('YYYYMMDD');
    const dateOperation = dayjs(mock.sales[0].operationDate).format('YYYYMMDD');

    const whiteSpaceFourteenSales = whiteSpace.repeat(15);

    const changeDate = repeatZero.repeat(8);
    const valueIS = repeatZero.repeat(10);

    const whiteSpaceFifteenSales = whiteSpace.repeat(300);

    const whiteSpaceSixteenSales = repeatZero.repeat(21);

    const whiteSpaceTwentyTwoSales = whiteSpace.repeat(1081);

    const whiteSpaceTrailer = whiteSpace.repeat(1989);

    expect(result).toEqual(
      `01${date}${mock.shippingNumber}${mock.insurerCode}${whiteSpaceOneHeader}${mock.contractNumber}${whiteSpaceTwoHeader}\n230000E00000${mock.sales[0].recordSequence}00${mock.sales[0].contractPlan}01${whiteSpaceOneSales}000000000${mock.sales[0].ticketNumber}0000${mock.sales[0].cpfCnpj}${whiteSpaceRGSales}${whiteSpaceContractorName}${mock.sales[0].dateBirthFoundation}${mock.sales[0].sex}${mock.sales[0].maritalStatus}${whiteSpaceAddress}${totalComplement}${totalDistrict}${totalCity}${mock.sales[0].cep}${mock.sales[0].uf}${mock.sales[0].ddd}${mock.sales[0].phone}${whiteSpaceTwoSales}${mock.sales[0].moduleNumber}${whiteSpaceFiveSales}${mock.sales[0].valueAward}${whiteSpaceTenSales}${contractDate}${mock.sales[0].installmentValue}${mock.sales[0].installmentAmount}${sellersman}${branch}${installmentDue}${whiteSpaceElevenSales}${whiteSpaceTwelveSales}${whiteSpaceThirteenSales}A${mock.sales[0].amountCollected}${dateDue}${dateCollection}${dateOperation}${whiteSpaceFourteenSales}${changeDate}${valueIS}${whiteSpaceFifteenSales}${mock.sales[0].lotRaffle}${mock.sales[0].luckyNumber}${whiteSpaceSixteenSales}${whiteSpaceTwentyTwoSales}\n16${mock.trailer[0].totalRecorsSent}${whiteSpaceTrailer}\n`,
    );
  });
});
