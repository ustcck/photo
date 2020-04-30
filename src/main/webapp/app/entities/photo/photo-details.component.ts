import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IPhoto } from '@/shared/model/photo.model';
import PhotoService from './photo.service';

@Component
export default class PhotoDetails extends mixins(JhiDataUtils) {
  @Inject('photoService') private photoService: () => PhotoService;
  public photo: IPhoto = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.photoId) {
        vm.retrievePhoto(to.params.photoId);
      }
    });
  }

  public retrievePhoto(photoId) {
    this.photoService()
      .find(photoId)
      .then(res => {
        this.photo = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
