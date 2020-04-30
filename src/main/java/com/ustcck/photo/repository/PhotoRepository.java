package com.ustcck.photo.repository;

import com.ustcck.photo.domain.Photo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Photo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long>, JpaSpecificationExecutor<Photo> {

    @Query("select photo from Photo photo where photo.user.login = ?#{principal.username}")
    List<Photo> findByUserIsCurrentUser();
}
