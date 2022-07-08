type MakeSMSResponseMock = {
  user: string;
  password: string;
  phoneNumber: string;
  message: string;
};

export const makeSMSHttpParamsMock = (params: MakeSMSResponseMock) => ({
  envios: {
    TOKEN: '',
    USUARIO: params.user,
    SENHA: params.password,
    TIPO_ROTA: 'PREMIO',
    UNE: '',
    GRUPO: '',
    SUBGRUPO: '',
    TELEFONES: [
      {
        TELEFONE: params.phoneNumber,
        MENSAGEM: params.message,
        MSGID: '1',
      },
    ],
  },
});

export const makeSmsHttpResponseMock = () => ({
  d: [
    {
      __type: 'MMenviojson+Resposta',
      ID_SMS: '311443913',
      STATUS: '014',
      MSGID: '1',
      TELEFONE: '44998825268',
      DESCRICAO: 'ENVIADO COM SUCESSO',
      RESPOSTA: null,
      DATA_ENVIO: '15/06/2022 10:08:17',
      DATA_RESPOSTA: null,
    },
  ],
});
