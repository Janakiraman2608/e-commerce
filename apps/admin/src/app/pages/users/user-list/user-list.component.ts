import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '@e-commerce/users';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }
  private _getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  updateUser(userId: string) {
    this.router.navigate(['form/', userId], { relativeTo: this.route });
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe(
          () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `User is deleted`,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'User not deleted',
            });
          }
        );
      },
    });
  }
}
