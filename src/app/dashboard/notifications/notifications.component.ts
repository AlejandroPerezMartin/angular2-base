import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../_services/notification.service';
import { MdlSnackbarService, MdlDialogReference, MdlDialogService } from 'angular2-mdl';
import { MdlDialogComponent } from 'angular2-mdl/components';
import { MdlExpansionPanelGroupComponent } from '@angular2-mdl-ext/expansion-panel';
import { NotificationEmail } from '../../_models/notification_email';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  private notificationEmails$: Array<NotificationEmail>;
  private newEmail: string;

  @ViewChild('notificationEmailDialog') notificationEmailDialog: MdlDialogComponent;
  @ViewChild('panelGroup') panelGroup: MdlExpansionPanelGroupComponent;

  constructor(
    private notificationService: NotificationService,
    private dialogService: MdlDialogService,
    private mdlSnackbarService: MdlSnackbarService) { }

  ngOnInit() {
    // Fetch the list of email notifications
    this.notificationService.listEmailsNotifications().subscribe(res => this.notificationEmails$ = res.results);
  }

  /**
   * Update a notification email
   * @param notificationEmail
   * @param panelIndex Index of the notification email within the notifications array
   */
  onUpdateNotificationEmail(notificationEmail: NotificationEmail, panelIndex: number, panel) {
    this.notificationService.updateEmailsNotifications({ 'id': notificationEmail.id, 'email': notificationEmail.email })
      .subscribe(
      res => {
        this.hideExpandedPanel(panelIndex);
        this.mdlSnackbarService.showToast('User updated successfully');
      },
      err => this.mdlSnackbarService.showToast(err.result));
  }

  /**
   * Delete a notification email
   * @param notificationEmail
   * @param panelIndex Index of the notification email within the notifications array
   */
  onDeleteNotificationEmail(notificationEmail: NotificationEmail, panelIndex: number) {
    // Confirmation prompt
    const prompt = this.dialogService.confirm('Are you sure you want to delete this email?', 'No', 'Yes', 'Delete email');

    prompt.subscribe(() => {
      this.notificationService.deleteEmailsNotifications(notificationEmail.id)
        .subscribe(
        res => {
          this.hideExpandedPanel();
          this.mdlSnackbarService.showToast('Email deleted successfully!');
          this.notificationEmails$.splice(panelIndex, 1);
        },
        err => this.mdlSnackbarService.showToast('Could not delete email'));
    }, err => { return; });
  }

  /**
   * Adds an email to the list of notifications recipient
   * @param email Email to which activate notifications on
   */
  onCreateNotificationEmail(email: string) {
    this.notificationService.createEmailsNotifications(email)
      .subscribe(
      res => {
        this.notificationEmails$.push(res.result);
        this.notificationEmailDialog.close();
        this.mdlSnackbarService.showToast('User added successfully');
      },
      err => this.mdlSnackbarService.showToast(err.result));
  }

  /**
   * Closes the expanded panel (the one that's being edited) or the provided one as fallback
   * @param index Panel index to close as fallback (e.g. index of the current item within loop)
   */
  private hideExpandedPanel(index?: number) {
    const panelIndex = (this.panelGroup.expandedIndex !== -1) ? this.panelGroup.expandedIndex : index || null;
    if (panelIndex) {
      this.panelGroup.getPanel(panelIndex).collapse();
    }
  }

  onDialogShow() { }

  /**
   * Reset newEmail field on dialog hide
   */
  onDialogHide() {
    this.newEmail = '';
  }

}
