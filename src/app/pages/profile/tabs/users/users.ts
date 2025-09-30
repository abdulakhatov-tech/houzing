import { Component } from '@angular/core';
import { IUser } from '@shared/interfaces/global';
import {
  ZardTableBodyComponent,
  ZardTableCaptionComponent,
  ZardTableCellComponent,
  ZardTableComponent,
  ZardTableHeadComponent,
  ZardTableHeaderComponent,
  ZardTableRowComponent,
} from '@shared/components/table/table.component';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardBadgeComponent } from '@shared/components/badge/badge.component';

@Component({
  selector: 'app-users',
  imports: [
    ZardTableComponent,
    ZardTableHeaderComponent,
    ZardTableBodyComponent,
    ZardTableRowComponent,
    ZardTableHeadComponent,
    ZardTableCellComponent,
    ZardBadgeComponent,
    ZardButtonComponent,
  ],
  template: `
    <div class="w-full">
      <div class="overflow-hidden rounded-sm border">
        <table z-table>
          <thead z-table-header>
            <tr z-table-row>
              <th z-table-head>First Name</th>
              <th z-table-head>Last Name</th>
              <th z-table-head>Email</th>
              <th z-table-head>Role</th>
              <th z-table-head class="w-16">Actions</th>
            </tr>
          </thead>
          <tbody z-table-body>
            @for (data of listOfData; track data._id) {
            <tr z-table-row>
              <td z-table-cell class="font-medium">{{ data.firstName }}</td>
              <td z-table-cell class="font-medium">{{ data.lastName }}</td>
              <td z-table-cell>{{ data.email }}</td>
              <td z-table-cell>
                <z-badge>
                  {{ data.role }}
                </z-badge>
              </td>
              <td z-table-cell>
                <div class="flex items-center gap-2">
                  <z-button zType="ghost" zSize="icon" title="Copy payment ID">
                    <div class="icon-copy"></div>
                  </z-button>
                  <z-button zType="ghost" zSize="icon" title="View details">
                    <div class="icon-eye"></div>
                  </z-button>
                </div>
              </td>
            </tr>
            } @empty {
            <tr z-table-row>
              <td z-table-cell [attr.colspan]="4" class="h-24 text-center">No results.</td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrl: './users.css',
})
export class Users {
  listOfData: IUser[] = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      role: 'admin',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '2',
      firstName: 'Alice',
      lastName: 'Brown',
      email: 'alice.brown@example.com',
      role: 'seller',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '3',
      firstName: 'David',
      lastName: 'Johnson',
      email: 'david.johnson@example.com',
      role: 'customer',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '4',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      role: 'seller',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '5',
      firstName: 'Michael',
      lastName: 'Wilson',
      email: 'michael.wilson@example.com',
      role: 'admin',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '6',
      firstName: 'Sophia',
      lastName: 'Miller',
      email: 'sophia.miller@example.com',
      role: 'customer',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '7',
      firstName: 'Daniel',
      lastName: 'Moore',
      email: 'daniel.moore@example.com',
      role: 'seller',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '8',
      firstName: 'Olivia',
      lastName: 'Taylor',
      email: 'olivia.taylor@example.com',
      role: 'customer',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '9',
      firstName: 'James',
      lastName: 'Anderson',
      email: 'james.anderson@example.com',
      role: 'admin',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '10',
      firstName: 'Grace',
      lastName: 'Thomas',
      email: 'grace.thomas@example.com',
      role: 'seller',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '11',
      firstName: 'Henry',
      lastName: 'Jackson',
      email: 'henry.jackson@example.com',
      role: 'customer',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '12',
      firstName: 'Chloe',
      lastName: 'White',
      email: 'chloe.white@example.com',
      role: 'admin',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '13',
      firstName: 'Liam',
      lastName: 'Harris',
      email: 'liam.harris@example.com',
      role: 'seller',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '14',
      firstName: 'Mia',
      lastName: 'Martin',
      email: 'mia.martin@example.com',
      role: 'customer',
      profilePhoto: '',
      phoneNumber: '',
    },
    {
      _id: '15',
      firstName: 'Ethan',
      lastName: 'Lee',
      email: 'ethan.lee@example.com',
      role: 'admin',
      profilePhoto: '',
      phoneNumber: '',
    },
  ];
}
