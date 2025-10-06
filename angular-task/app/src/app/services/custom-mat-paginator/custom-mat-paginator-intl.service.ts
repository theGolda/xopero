import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private _translate: TranslateService) {
    super();
    this._translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  private translateLabels(): void {
    this.itemsPerPageLabel = this._translate.instant('paginator.itemsPerPageLabel');
    this.nextPageLabel = this._translate.instant('paginator.nextPageLabel');
    this.previousPageLabel = this._translate.instant('paginator.previousPageLabel');
    this.firstPageLabel = this._translate.instant('paginator.firstPageLabel');
    this.lastPageLabel = this._translate.instant('paginator.lastPageLabel');
    this.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return this._translate.instant('paginator.getRangeLabel', { 
          start: '0', 
          end: '0', 
          total: length.toString() 
        });
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return this._translate.instant('paginator.getRangeLabel', { 
        start: (startIndex + 1).toString(), 
        end: endIndex.toString(), 
        total: length.toString() 
      });
    };
    this.changes.next();
  }
}