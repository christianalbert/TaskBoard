import { Component } from '@angular/core';

import { UserSettingsService } from './user-settings.service';
import {
    AuthService,
    NotificationsService,
    User,
    Notification
} from '../../shared/index';

interface PassForm {
    current: string;
    newPass: string;
    verPass: string;
    submitted: boolean;
};

@Component({
    selector: 'tb-user-settings',
    templateUrl: 'app/settings/user-settings/user-settings.component.html'
})
export class UserSettings {
    private user: User;
    private changePassword: PassForm;

    constructor(private auth: AuthService,
            private notes: NotificationsService,
            private userService: UserSettingsService) {
        this.user = auth.activeUser;
        this.resetPasswordForm();
    }

    updatePassword() {
        this.changePassword.submitted = true;

        if (!this.validatePassForm()) {
            return;
        }

        // TODO: submit the change request
        this.resetPasswordForm();
        this.changePassword.submitted = false;
    }

    resetPasswordForm() {
        this.changePassword = {
            current: '',
            newPass: '',
            verPass: '',
            submitted: false
        };
    }

    private validatePassForm() {
        if (this.changePassword.current === '' ||
                this.changePassword.newPass === '' ||
                this.changePassword.verPass === '') {
            this.notes.add(new Notification('error',
                'All fields are required to change your password.'));
            this.changePassword.submitted = false;

            return false;
        }

        if (this.changePassword.newPass !== this.changePassword.verPass) {
            this.notes.add(new Notification('error',
                'New password and verify password do not match.'));
            this.changePassword.submitted = false;

            return false;
        }

        return true;
    }
}

