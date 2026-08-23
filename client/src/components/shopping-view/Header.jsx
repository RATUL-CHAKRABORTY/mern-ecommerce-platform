import { Link, useNavigate } from "react-router-dom"
import {House,Menu,ShoppingCart,UserRoundCog ,LogOut} from "lucide-react"
import { Sheet,SheetTrigger,SheetContent} from "../ui/sheet";
import {Button} from "../ui/button"
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuLabel,DropdownMenuSeparator,
DropdownMenuItem
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector,useDispatch } from "react-redux";  
import { shoppingViewHeaderMenuItems } from "@/config";
import { logoutUser } from "@/store/auth-slice";
import { removeProductDetails } from "@/store/shop/product-slice";


/*create a menu item for shopping header */

function MenuItems(){
  const dispatch=useDispatch();
  

  //use this the remove the curretn product details when changing the the trigger.
  function removeProductDetailsHelper(){
   dispatch(removeProductDetails());  
  }
  return <nav className="flex flex-col mb-3 lg:mb-9 lg:items-center gap-6 lg:flex-row">
    {
      shoppingViewHeaderMenuItems.map(menuItem => <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path} onClick={removeProductDetailsHelper} >{menuItem.label}</Link>)
    }
  </nav>
}

//right content of header
function HeaderRightcontent(){

   const {user}=useSelector(state=>state.auth)
   const navigate= useNavigate()
   const dispatch=useDispatch();

   function handleLogout(){
    dispatch(logoutUser());
   }
  return <div className="flex lg:items-center lg:flex-row flex-col gap-4 ">
    <Button variant="outline" size="icon">
     <ShoppingCart className="w-6 h-6" />
     <span className="sr-only">User cart</span>
    </Button>

    {/*Drop down menu*/}
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
         <Avatar className="bg-black">
        <AvatarFallback className="bg-black text-white font-extrabold">{user?.userName[0].toUpperCase()}</AvatarFallback>
      </Avatar>
        </DropdownMenuTrigger> 
         <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName} </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
            <UserRoundCog className="mr-2 h-4 w-4"/>Account
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />Logout
          </DropdownMenuItem>
         </DropdownMenuContent>
         

      </DropdownMenu>
    
    
    </div> 
}

//Shopping header component
function ShoppingHeader(){

  {/* to check if user is authenticated or not*/}
  const {isAuthenticated}=useSelector(state=>state.auth)

  
  return <header className="sticky top-0 z-40 w-full border-b bg-background">
   <div className="flex h-16 items-center justify-between px-4 md:px-6  w-full">
    <Link to="/shop/home" className="flex items-center gap-2">
    <House className="h-6 w-6"/>
     <span className="font-bold">Ecommerce</span>
    </Link>

    {/*using sheet component for smaller device*/}
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden" >
          {/* Use menu icon from lucide  */}
          <Menu  className="h-6 w-6"/>
          <span className="sr-only">Toggle header menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full max-w-xs">
        <MenuItems/>
        <HeaderRightcontent/>
      </SheetContent>
    </Sheet>
     {/*for larger devices*/}
     <div className="hidden lg:block">
      <MenuItems/>
     </div>
     
    <div className="hidden lg:block">
    <HeaderRightcontent/>
    </div>
   
   </div>
  </header>
}

export default ShoppingHeader;
