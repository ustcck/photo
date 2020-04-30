<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="photoApp.photo.home.createOrEditLabel" v-text="$t('photoApp.photo.home.createOrEditLabel')">Create or edit a Photo</h2>
                <div>
                    <div class="form-group" v-if="photo.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="photo.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('photoApp.photo.name')" for="photo-name">Name</label>
                        <input type="text" class="form-control" name="name" id="photo-name"
                            :class="{'valid': !$v.photo.name.$invalid, 'invalid': $v.photo.name.$invalid }" v-model="$v.photo.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('photoApp.photo.date')" for="photo-date">Date</label>
                        <div class="d-flex">
                            <input id="photo-date" type="datetime-local" class="form-control" name="date" :class="{'valid': !$v.photo.date.$invalid, 'invalid': $v.photo.date.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.photo.date.$model)"
                            @change="updateInstantField('date', $event)"/>
                        </div>
                        <div v-if="$v.photo.date.$anyDirty && $v.photo.date.$invalid">
                            <small class="form-text text-danger" v-if="!$v.photo.date.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.photo.date.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('photoApp.photo.description')" for="photo-description">Description</label>
                        <input type="text" class="form-control" name="description" id="photo-description"
                            :class="{'valid': !$v.photo.description.$invalid, 'invalid': $v.photo.description.$invalid }" v-model="$v.photo.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('photoApp.photo.image')" for="photo-image">Image</label>
                        <div>
                            <img v-bind:src="'data:' + photo.imageContentType + ';base64,' + photo.image" style="max-height: 100px;" v-if="photo.image" alt="photo image"/>
                            <div v-if="photo.image" class="form-text text-danger clearfix">
                                <span class="pull-left">{{photo.imageContentType}}, {{byteSize(photo.image)}}</span>
                                <button type="button" v-on:click="clearInputImage('image', 'imageContentType', 'file_image')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_image" id="file_image" v-on:change="setFileData($event, photo, 'image', true)" accept="image/*" v-text="$t('entity.action.addimage')"/>
                        </div>
                        <input type="hidden" class="form-control" name="image" id="photo-image"
                            :class="{'valid': !$v.photo.image.$invalid, 'invalid': $v.photo.image.$invalid }" v-model="$v.photo.image.$model" />
                        <input type="hidden" class="form-control" name="imageContentType" id="photo-imageContentType"
                            v-model="photo.imageContentType" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('photoApp.photo.user')" for="photo-user">User</label>
                        <select class="form-control" id="photo-user" name="user" v-model="photo.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="photo.user && userOption.id === photo.user.id ? photo.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.photo.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./photo-update.component.ts">
</script>
