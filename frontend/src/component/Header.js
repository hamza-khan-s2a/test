import { getUserInfo } from "../localStroage"
import { brandName } from "../utils"


const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo()

    return (
      `
        <div class="brand">
          <a href="/#/">${brandName()}</a>
        </div>
        <div>
        ${name ? `<a href="/#/profile">${name}</a>` : `<a href="/#/signin">Sign In</a>`}
          <a href="/#/cart">Cart</a>
          ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ""}
        </div>
     `
    )

  }
  ,
  after_render: () => { }
}

export default Header