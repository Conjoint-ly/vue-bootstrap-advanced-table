import ColumnType from "./ColumnType";
import tPercentCell from './t-percent-cell';
import { formatPercents, convertToNumberArray } from "../../../helpers";
import { count, max, mean, median, min, sum } from "../../../helpers/aggregations";

export default class PercentColumnType extends ColumnType {
  static type = 'percent';
  static cell = tPercentCell;
  static aggregations = [ sum, min, max, mean, median, count ]
    .reduce((agg, method) => ({
      ...agg,
      [method.name]: (values) => {
        const validData = method.name === 'count' ? values : convertToNumberArray(values)
        return method(validData);
      },
    }), {});

  static formatAggregatedValue(name, value) {
    return name === 'count' ? value : formatPercents(value);
  }
  static isAggregatedValueValid(name, value) {
    return !(name === 'sum' && value > 1);
  }
}