import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class PhotoUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('photoApp.photo.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#photo-name'));

  dateInput: ElementFinder = element(by.css('input#photo-date'));

  descriptionInput: ElementFinder = element(by.css('input#photo-description'));

  imageInput: ElementFinder = element(by.css('input#file_image'));

  userSelect = element(by.css('select#photo-user'));
}
