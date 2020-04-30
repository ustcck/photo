/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import PhotoDetailComponent from '@/entities/photo/photo-details.vue';
import PhotoClass from '@/entities/photo/photo-details.component';
import PhotoService from '@/entities/photo/photo.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Photo Management Detail Component', () => {
    let wrapper: Wrapper<PhotoClass>;
    let comp: PhotoClass;
    let photoServiceStub: SinonStubbedInstance<PhotoService>;

    beforeEach(() => {
      photoServiceStub = sinon.createStubInstance<PhotoService>(PhotoService);

      wrapper = shallowMount<PhotoClass>(PhotoDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { photoService: () => photoServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundPhoto = { id: 123 };
        photoServiceStub.find.resolves(foundPhoto);

        // WHEN
        comp.retrievePhoto(123);
        await comp.$nextTick();

        // THEN
        expect(comp.photo).toBe(foundPhoto);
      });
    });
  });
});
