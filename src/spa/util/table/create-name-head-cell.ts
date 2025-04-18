import type CreatorElement from '../creator-element';
import type { Description } from '../../../types';
import { CSS_TABLE } from './table-classes';

export function createNameHeadCell(headCellCreator: CreatorElement, columnName: Description): void {
    headCellCreator.setCssClasses([CSS_TABLE.TABLE_HEAD_NAME]);
    headCellCreator.setTextContent(columnName);
}
