import { getMyOrders, update } from "../api"
import { getUserInfo, setUserInfo, clearUser } from "../localStroage"
import { hideLoading, showLoading, showMessage } from "../utils"

const ProfileScreen = {
  after_render: () => {
    document.querySelector('#signout-button')
      .addEventListener('click', () => {
        clearUser();
        document.location.hash = '/'
      })
    document.querySelector('#profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault()
        showLoading()
        const data = await update(
          document.querySelector('#name').value,
          document.querySelector('#email').value,
          document.querySelector('#password').value,
        )
        hideLoading()
        if (data.error) {
          showMessage(data.error)
        } else {
          setUserInfo(data)
          document.location.hash = '/'
        }
      })
  },
  render: async () => {
    const { name, email } = getUserInfo()
    if (!name) {
      document.location.hash = '/'
    }
    const orders = await getMyOrders()
    return (`
    <div class = "content profile">
      <div class = "profile-info">
        <div class = "form-container">
            <form id = "profile-form">
              <ul class = "form-items">
                <li>
                  <h1>User Profile </h1>
                </li> 
                <li>
                  <label for = "name">Name </label>
                  <input type = "name" name ="name" id = "name" value = ${name}>
                </li> 
                <li>
                  <label for = "email">Email </label>
                  <input type = "email" name ="email" id = "email" value = ${email}>
                </li> 
                <li>
                  <label for = "password">Password</label>
                  <input type = "password" name ="password" id = "password">
                </li> 
                <li>
                  <button type = "submit" class="primary">Update </button>
                </li> 
                <li>
                  <button type = "button" id="signout-button" >Sign Out</button>
                </li> 
            
              </ul>
          </form>
      </div>
    </div>
    <div class="profile-orders">
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${orders.length === 0 ? `<tr><td colspan = "6">No Order Found</td></tr>` :
        orders.map(order => `
            <tr> 
              <td>${order._id}</td>
              <td>${order.createdAt}</td>
              <td>${order.totalPrice}</td>
              <td>${order.isPaid}</td>
              <td>${order.isDelivered}</td>
              <td><a href = "/#/order/${order._id}">Details</a></td>
            </tr>
          `)
      }
        </tbody>
      </table>
    </div>

</div>

`)

  }
}


export default ProfileScreen