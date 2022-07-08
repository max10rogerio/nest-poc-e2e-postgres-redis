import * as dayjs from 'dayjs';

export const makeHelpers = (domain: string) => ({
  formatDate: function (date: Date): string {
    return dayjs(date).format('DD/MM/YYYY');
  },

  makeAssetsURL: function (assetsPath: string) {
    return new URL(assetsPath, domain).toString();
  },
});
