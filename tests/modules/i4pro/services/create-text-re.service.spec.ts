import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import { I4proModule } from 'src/modules/i4pro/i4pro.module';
import { CreateTextREService, CreateTextREServiceParams } from 'src/modules/i4pro/services';

describe('CreateTextREService (Unit)', () => {
  let createTextREService: CreateTextREService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [I4proModule],
      providers: [{ provide: CreateTextREService, useClass: CreateTextREService }],
    }).compile();

    createTextREService = await app.resolve<CreateTextREService>(CreateTextREService);
  });

  it('should return a formated responde', async () => {
    const mock: CreateTextREServiceParams = {
      shippingDate: '20220513',
      shippingNumber: '001314',
      insurerCode: 2968,
      contractNumber: '0506540314',
      sales: [
        {
          recordSequence: 1,
          ticketNumber: 220000000000001,
          contractorName: 'Yago Rodrigues',
          cpfCnpj: 96488695029,
          dateBirthFoundation: '19920720',
          sex: 'M',
          maritalStatus: 'S',
          address: 'SMPW QUADRA 5 CONJ 3 LOTE 7 CASA',
          complement: '',
          district: 'Distrito Novo',
          city: 'Brasília',
          cep: 71735503,
          uf: 'DF',
          ddd: '0061',
          phone: 81911875,
          moduleNumber: '001',
          valueAward: '00009990',
          contractDate: '20211111',
          riskAddress: 'SMPW Quadra 5 Conjunto 37',
          riskComplement: 'Muitos detalhes',
          riskDistrict: 'Casa',
          riskCity: 'Brasília',
          riskCep: 71735503,
          riskUf: 'DF',
          typeHousing: 'H',
          typeConstruction: 'AL',
          propertyType: 'CA',
          serialNumber: 1212,
          luckyNumber: 123123,
        },
      ],
      trailer: [
        {
          totalRecorsSent: '000000002',
        },
      ],
    };

    const result = await createTextREService.createTextRE(mock);

    const date = dayjs(mock.shippingDate).format('YYYYMMDD');
    const whiteSpace = ' ';
    const whiteSpaceOneHeader = whiteSpace.repeat(24);
    const whiteSpaceTwoHeader = whiteSpace.repeat(747);

    const whiteSpaceOneSale = whiteSpace.repeat(5);
    const whiteSpaceContractorName = mock.sales[0].contractorName.padEnd(50, ' ');
    const dateBirthFoundation = dayjs(mock.sales[0].dateBirthFoundation).format('YYYYMMDD');
    const whiteSpaceTwoSale = whiteSpace.repeat(34);
    const whiteSpaceAddress = mock.sales[0].address.padEnd(70, ' ');
    const complementCond = (mock.sales[0].complement || '').padEnd(70, ' ');
    const whiteSpaceDistrict = mock.sales[0].district.padEnd(25, ' ');
    const whiteSpaceCity = mock.sales[0].city.padEnd(35, ' ');
    const whiteSpaceThreeSale = whiteSpace.repeat(16);
    const dateContract = dayjs(mock.sales[0].contractDate).format('YYYYMMDD');
    const startValidity = dayjs(mock.sales[0].contractDate).format('YYYYMMDD');
    const endValidity = dayjs(mock.sales[0].contractDate).add(30, 'day').format('YYYYMMDD');
    const whiteSpaceFourSale = whiteSpace.repeat(16);
    const whiteSpaceRiskAddress = mock.sales[0].riskAddress.padEnd(70, ' ');
    const riskComplementCond = (mock.sales[0].riskComplement || '').padEnd(70, ' ');
    const whiteSpaceRiskDistrict = mock.sales[0].riskDistrict.padEnd(25, ' ');
    const whiteSpaceRiskCity = mock.sales[0].riskCity.padEnd(35, ' ');
    const whiteSpaceFiveSale = whiteSpace.repeat(9);
    const whiteSpaceSixSale = whiteSpace.repeat(29);

    const whiteSpaceOneTrailer = whiteSpace.repeat(789);

    expect(result).toEqual(
      `01${date}${mock.shippingNumber}${mock.insurerCode}${whiteSpaceOneHeader}${mock.contractNumber}${whiteSpaceTwoHeader}\n030100000${mock.sales[0].recordSequence}${whiteSpaceOneSale}${mock.sales[0].ticketNumber}${whiteSpaceContractorName}000${mock.sales[0].cpfCnpj}${dateBirthFoundation}${whiteSpaceTwoSale}${mock.sales[0].sex}${mock.sales[0].maritalStatus}${whiteSpaceAddress}${complementCond}${whiteSpaceDistrict}${whiteSpaceCity}${mock.sales[0].cep}${mock.sales[0].uf}${mock.sales[0].ddd}${mock.sales[0].phone}${whiteSpaceThreeSale}${mock.sales[0].moduleNumber}${mock.sales[0].valueAward}${dateContract}${startValidity}${endValidity}01${whiteSpaceFourSale}${whiteSpaceContractorName}000${mock.sales[0].cpfCnpj}${dateBirthFoundation}${whiteSpaceTwoSale}${mock.sales[0].sex}${mock.sales[0].maritalStatus}${whiteSpaceRiskAddress}${riskComplementCond}${whiteSpaceRiskDistrict}${whiteSpaceRiskCity}${mock.sales[0].riskCep}${mock.sales[0].riskUf}${mock.sales[0].typeHousing}${mock.sales[0].typeConstruction}${mock.sales[0].propertyType}${whiteSpaceFiveSale}${mock.sales[0].serialNumber}${mock.sales[0].luckyNumber}${whiteSpaceSixSale}\n16${mock.trailer[0].totalRecorsSent}${whiteSpaceOneTrailer}\n`,
    );
  });

  it('should return a formated responde with null values', async () => {
    const mock: CreateTextREServiceParams = {
      shippingDate: '20220513',
      shippingNumber: '001314',
      insurerCode: 2968,
      contractNumber: '0506540314',
      sales: [
        {
          recordSequence: 1,
          ticketNumber: 220000000000001,
          contractorName: 'Yago Rodrigues',
          cpfCnpj: 96488695029,
          dateBirthFoundation: '19920720',
          sex: 'M',
          maritalStatus: 'S',
          address: 'SMPW QUADRA 5 CONJ 3 LOTE 7 CASA',
          complement: '',
          district: 'Distrito Novo',
          city: 'Brasília',
          cep: 71735503,
          uf: 'DF',
          ddd: '0061',
          phone: 81911875,
          moduleNumber: '001',
          valueAward: '00009990',
          contractDate: '20211111',
          riskAddress: 'SMPW Quadra 5 Conjunto 37',
          riskComplement: null,
          riskDistrict: 'Casa',
          riskCity: 'Brasília',
          riskCep: 71735503,
          riskUf: 'DF',
          typeHousing: 'H',
          typeConstruction: 'AL',
          propertyType: 'CA',
          serialNumber: undefined,
          luckyNumber: null,
        },
      ],
      trailer: [
        {
          totalRecorsSent: '000000002',
        },
      ],
    };

    const result = await createTextREService.createTextRE(mock);

    const date = dayjs(mock.shippingDate).format('YYYYMMDD');
    const whiteSpace = ' ';
    const whiteSpaceOneHeader = whiteSpace.repeat(24);
    const whiteSpaceTwoHeader = whiteSpace.repeat(747);

    const whiteSpaceOneSale = whiteSpace.repeat(5);
    const whiteSpaceContractorName = mock.sales[0].contractorName.padEnd(50, ' ');
    const dateBirthFoundation = dayjs(mock.sales[0].dateBirthFoundation).format('YYYYMMDD');
    const whiteSpaceTwoSale = whiteSpace.repeat(34);
    const whiteSpaceAddress = mock.sales[0].address.padEnd(70, ' ');
    const complementCond = (mock.sales[0].complement || '').padEnd(70, ' ');
    const whiteSpaceDistrict = mock.sales[0].district.padEnd(25, ' ');
    const whiteSpaceCity = mock.sales[0].city.padEnd(35, ' ');
    const whiteSpaceThreeSale = whiteSpace.repeat(16);
    const dateContract = dayjs(mock.sales[0].contractDate).format('YYYYMMDD');
    const startValidity = dayjs(mock.sales[0].contractDate).format('YYYYMMDD');
    const endValidity = dayjs(mock.sales[0].contractDate).add(30, 'day').format('YYYYMMDD');
    const whiteSpaceFourSale = whiteSpace.repeat(16);
    const whiteSpaceRiskAddress = mock.sales[0].riskAddress.padEnd(70, ' ');
    const riskComplementCond = (mock.sales[0].riskComplement || '').padEnd(70, ' ');
    const whiteSpaceRiskDistrict = mock.sales[0].riskDistrict.padEnd(25, ' ');
    const whiteSpaceRiskCity = mock.sales[0].riskCity.padEnd(35, ' ');
    const whiteSpaceFiveSale = whiteSpace.repeat(9);
    const whiteSpaceSixSale = whiteSpace.repeat(29);
    const whiteSpaceSerialNumber = whiteSpace.repeat(4);
    const whiteSpaceLuckyNumber = whiteSpace.repeat(6);

    const whiteSpaceOneTrailer = whiteSpace.repeat(789);

    expect(result).toEqual(
      `01${date}${mock.shippingNumber}${mock.insurerCode}${whiteSpaceOneHeader}${mock.contractNumber}${whiteSpaceTwoHeader}\n030100000${mock.sales[0].recordSequence}${whiteSpaceOneSale}${mock.sales[0].ticketNumber}${whiteSpaceContractorName}000${mock.sales[0].cpfCnpj}${dateBirthFoundation}${whiteSpaceTwoSale}${mock.sales[0].sex}${mock.sales[0].maritalStatus}${whiteSpaceAddress}${complementCond}${whiteSpaceDistrict}${whiteSpaceCity}${mock.sales[0].cep}${mock.sales[0].uf}${mock.sales[0].ddd}${mock.sales[0].phone}${whiteSpaceThreeSale}${mock.sales[0].moduleNumber}${mock.sales[0].valueAward}${dateContract}${startValidity}${endValidity}01${whiteSpaceFourSale}${whiteSpaceContractorName}000${mock.sales[0].cpfCnpj}${dateBirthFoundation}${whiteSpaceTwoSale}${mock.sales[0].sex}${mock.sales[0].maritalStatus}${whiteSpaceRiskAddress}${riskComplementCond}${whiteSpaceRiskDistrict}${whiteSpaceRiskCity}${mock.sales[0].riskCep}${mock.sales[0].riskUf}${mock.sales[0].typeHousing}${mock.sales[0].typeConstruction}${mock.sales[0].propertyType}${whiteSpaceFiveSale}${whiteSpaceSerialNumber}${whiteSpaceLuckyNumber}${whiteSpaceSixSale}\n16${mock.trailer[0].totalRecorsSent}${whiteSpaceOneTrailer}\n`,
    );
  });
});
