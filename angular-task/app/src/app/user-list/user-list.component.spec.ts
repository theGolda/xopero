import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';

import { UserListComponent } from './user-list.component';
import { UserModel } from '@models/user.model';
import { selectUsers } from '@store/store.selectors';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let store: MockStore;

    const mockUsers: UserModel[] = [
        {
            id: 1,
            name: 'John Doe',
            role: 'Admin',
            email: 'john.doe@example.com',
            protectedProjects: 5,
            isFavorite: true
        },
        {
            id: 2,
            name: 'Jane Smith',
            role: 'User',
            email: 'jane.smith@example.com',
            protectedProjects: 3,
            isFavorite: false
        }
    ];

    beforeEach(async () => {

        const mockTranslateService = jasmine.createSpyObj('TranslateService', ['instant', 'get', 'use', 'setDefaultLang']);

        await TestBed.configureTestingModule({
            imports: [
                UserListComponent,
                ReactiveFormsModule,
            ],
            providers: [
                FormBuilder,
                { provide: TranslateService, useValue: mockTranslateService },
                provideMockStore()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store) as MockStore;
        store.overrideSelector(selectUsers, mockUsers);
    });

    describe('Data Source Updates', () => {
        it('should update dataSource when users$ emits', () => {
            component.ngOnInit();

            expect(component.dataSource.data).toEqual(mockUsers);
        });
    });

    describe('Search Form Setup', () => {
        it('should correctly set up searchForm', () => {
            expect(component.searchForm).toBeDefined();
            expect(component.searchForm.get('searchText')).toBeDefined();
            expect(component.searchForm.get('searchText')?.value).toBe('');
        });

        it('should have searchForm with correct initial value', () => {
            const searchControl = component.searchForm.get('searchText');
            expect(searchControl?.value).toBe('');
        });

        it('should allow setting searchText value', () => {
            const testSearchText = 'test search text';
            component.searchForm.get('searchText')?.setValue(testSearchText);
            expect(component.searchForm.get('searchText')?.value).toBe(testSearchText);
        });
    });

    describe('Search Text Filter Application', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('should apply searchText to dataSource.filter when searchText updates', () => {
            const testSearchText = 'john';
            component.searchForm.get('searchText')?.setValue(testSearchText);
            expect(component.dataSource.filter).toBe(testSearchText);
        });

        it('should apply trimmed and lowercased searchText to dataSource.filter', () => {
            component.searchForm.get('searchText')?.setValue('  JOHN DOE  ');
            expect(component.dataSource.filter).toBe('john doe');
        });

        it('should clear filter when searchText is empty', () => {
            component.searchForm.get('searchText')?.setValue('john');
            component.searchForm.get('searchText')?.setValue('');
            expect(component.dataSource.filter).toBe('');
        });

        it('should handle null searchText', () => {
            component.searchForm.get('searchText')?.setValue(null);
            expect(component.dataSource.filter).toBe('');
        });
    });

    describe('Data Source Filter Predicate', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('should return true when searchText is empty', () => {
            component.searchForm.get('searchText')?.setValue('');
            const filterPredicate = component.dataSource.filterPredicate;
            const result = filterPredicate(mockUsers[0], '');
            expect(result).toBe(true);
        });

        it('should return true when name matches searchText', () => {
            const testSearchText = 'john';
            component.searchForm.get('searchText')?.setValue(testSearchText);
            const filterPredicate = component.dataSource.filterPredicate;
            const result = filterPredicate(mockUsers[0], testSearchText);
            expect(result).toBe(true);
        });

        it('should return true when role matches searchText', () => {
            const testSearchText = 'admin';
            component.searchForm.get('searchText')?.setValue(testSearchText);
            const filterPredicate = component.dataSource.filterPredicate;
            const result = filterPredicate(mockUsers[0], testSearchText);
            expect(result).toBe(true);
        });

        it('should return true when email matches searchText', () => {
            const testSearchText = 'jane.smith';
            component.searchForm.get('searchText')?.setValue(testSearchText);
            const filterPredicate = component.dataSource.filterPredicate;
            const result = filterPredicate(mockUsers[1], testSearchText);
            expect(result).toBe(true);
        });

        it('should return true when protectedProjects matches searchText', () => {
            const testSearchText = '5';
            component.searchForm.get('searchText')?.setValue(testSearchText);
            const filterPredicate = component.dataSource.filterPredicate;
            const result = filterPredicate(mockUsers[0], testSearchText);
            expect(result).toBe(true);
        });

        it('should return false when no field matches searchText', () => {
            const testSearchText = 'nonexistent';
            component.searchForm.get('searchText')?.setValue(testSearchText);
            const filterPredicate = component.dataSource.filterPredicate;
            const result = filterPredicate(mockUsers[0], testSearchText);
            expect(result).toBe(false);
        });

        it('should handle case insensitive matching', () => {
            const testSearchText = 'JOHN';
            component.searchForm.get('searchText')?.setValue(testSearchText);
            const filterPredicate = component.dataSource.filterPredicate;
            const result = filterPredicate(mockUsers[0], testSearchText);
            expect(result).toBe(true);
        });

        it('should handle partial matches', () => {
            const testSearchText = 'doe';
            component.searchForm.get('searchText')?.setValue(testSearchText);
            const filterPredicate = component.dataSource.filterPredicate;
            const result = filterPredicate(mockUsers[0], testSearchText);
            expect(result).toBe(true);
        });
    });

    describe('View Initialization', () => {
        it('should assign both paginator and sort to dataSource in ngAfterViewInit', () => {
            component.ngAfterViewInit();
            expect(component.dataSource.paginator).toBe(component.paginator);
            expect(component.dataSource.sort).toBe(component.sort);
        });
    });
});
