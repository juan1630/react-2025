import { Outlet } from "react-router"
import { CustomHeader } from "../components/CustomHeader"
import { CustomeFooter } from "../components/CustomeFooter"

export const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader/>
      <Outlet/>
      <CustomeFooter/>
    </div>
  )
}
