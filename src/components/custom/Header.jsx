import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";



const Header = () => {

  const user = JSON.parse(localStorage.getItem("user"));
 
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
      
            <Popover>
              <PopoverTrigger>
              <img
              src={user?.picture}
              className="h-[35px] w-[35px] rounded-full"
              alt=""
            />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
                
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
