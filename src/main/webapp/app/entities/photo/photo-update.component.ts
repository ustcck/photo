import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { IPhoto, Photo } from '@/shared/model/photo.model';
import PhotoService from './photo.service';

const validations: any = {
  photo: {
    name: {},
    date: {
      required
    },
    description: {},
    image: {}
  }
};

@Component({
  validations
})
export default class PhotoUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('photoService') private photoService: () => PhotoService;
  public photo: IPhoto = new Photo();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.photoId) {
        vm.retrievePhoto(to.params.photoId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.photo.id) {
      this.photoService()
        .update(this.photo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('photoApp.photo.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.photoService()
        .create(this.photo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('photoApp.photo.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.photo[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.photo[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.photo[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.photo[field] = null;
    }
  }

  public retrievePhoto(photoId): void {
    this.photoService()
      .find(photoId)
      .then(res => {
        res.date = new Date(res.date);
        this.photo = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.photo && field && fieldContentType) {
      if (this.photo.hasOwnProperty(field)) {
        this.photo[field] = null;
      }
      if (this.photo.hasOwnProperty(fieldContentType)) {
        this.photo[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
