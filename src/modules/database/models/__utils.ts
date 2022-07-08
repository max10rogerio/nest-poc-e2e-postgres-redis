export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return data && parseFloat(data);
  }
}

export const CurrentTimestamp = () => 'CURRENT_TIMESTAMP';
