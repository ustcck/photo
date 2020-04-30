<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="photo">
                <h2 class="jh-entity-heading"><span v-text="$t('photoApp.photo.detail.title')">Photo</span> {{photo.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('photoApp.photo.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{photo.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('photoApp.photo.date')">Date</span>
                    </dt>
                    <dd>
                        <span v-if="photo.date">{{$d(Date.parse(photo.date), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('photoApp.photo.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{photo.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('photoApp.photo.image')">Image</span>
                    </dt>
                    <dd>
                        <div v-if="photo.image">
                            <a v-on:click="openFile(photo.imageContentType, photo.image)">
                                <img v-bind:src="'data:' + photo.imageContentType + ';base64,' + photo.image" style="max-width: 100%;" alt="photo image"/>
                            </a>
                            {{photo.imageContentType}}, {{byteSize(photo.image)}}
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('photoApp.photo.user')">User</span>
                    </dt>
                    <dd>
                        {{photo.user ? photo.user.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="photo.id" :to="{name: 'PhotoEdit', params: {photoId: photo.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./photo-details.component.ts">
</script>
