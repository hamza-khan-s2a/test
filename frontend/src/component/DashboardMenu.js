import InventoryScreen from "../screens/InventoryScreen"

const DashBoardMenu = {

  render: (props) => (
    `
        <div class="dashboard-menu">
          <ul>
            <li class = "${props.selected === 'dashboard' ? 'selected' : ''}">
              <a href = "/#/dashboard">DashBoard</a>
            <li>
            <li class = "${props.selected === 'products' ? 'selected' : ''}">
              <a href = "/#/inventory">product</a>
            <li>
            <li class = "${props.selected === 'orders' ? 'selected' : ''}">
              <a href = "/#/orderlist">Orders</a>
            <li>
          <ul>
        </div>
        
     `
  )

}

export default DashBoardMenu