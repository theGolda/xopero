import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('paginator.itemsPerPageLabel');
    this.nextPageLabel = this.translate.instant('paginator.nextPageLabel');
    this.previousPageLabel = this.translate.instant('paginator.previousPageLabel');
    this.firstPageLabel = this.translate.instant('paginator.firstPageLabel');
    this.lastPageLabel = this.translate.instant('paginator.lastPageLabel');
    this.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return this.translate.instant('paginator.getRangeLabel', { 
          start: '0', 
          end: '0', 
          total: length.toString() 
        });
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return this.translate.instant('paginator.getRangeLabel', { 
        start: (startIndex + 1).toString(), 
        end: endIndex.toString(), 
        total: length.toString() 
      });
    };
    this.changes.next();
  }
}
