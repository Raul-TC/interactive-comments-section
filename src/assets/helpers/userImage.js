import amy from '../avatars/image-amyrobson.png'
import juliusomo from '../avatars/image-juliusomo.png'
import max from '../avatars/image-maxblagun.png'
import ramses from '../avatars/image-ramsesmiron.png'

let userImg = null
export const userImage = (username) => {
  userImg = ''
  if (username === 'amyrobson') {
    userImg = amy
  } else if (username === 'maxblagun') {
    userImg = max
  } else if (username === 'ramsesmiron') {
    userImg = ramses
  } else if (username === 'juliusomo') {
    userImg = juliusomo
  }

  return userImg
}
