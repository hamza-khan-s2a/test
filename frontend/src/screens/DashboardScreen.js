import DashBoardMenu from "../component/DashboardMenu"

const DashboardScreen = {
  after_render: () => { },
  render: () => `
    <div class = "dashboard">
      ${DashBoardMenu.render({ selected: "dashboard" })}
      <div class= "dashboard-content">
        <h1>DashBoard<h1>
        <div>Info and charts will be added here<div>

      </div>
    </div>`
}

export default DashboardScreen