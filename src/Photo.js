import React from 'react'

const Photo = ({urls:{regular}, alt_description, id,user:{name, profile_url, profile_image:{medium} }, likes }) => {

  // const {id,alt_description,likes,image_small:urls.small } = photo
  return ( <article className="photo">
  <img src={regular} alt={alt_description}/>
  <div className="photo-info">
      <div>
        <h4>{name}</h4>
        <p>{likes} Likes</p>
      </div>
      <a href={profile_url}>
        <img src={medium} className="user-img" alt={name} /></a>
  </div>
</article>)
}

export default Photo
