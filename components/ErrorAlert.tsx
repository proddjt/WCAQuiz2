import {Alert} from "@heroui/react";

export default function ErrorAlert({isAlertOpen} : {isAlertOpen: boolean}) {
  return (
    <div className={`transition-all duration-500 ease-in-out ${isAlertOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"} flex items-center justify-center fixed lg:bottom-20 lg:right-20 bottom-5 right-5`}> 
      <Alert description="Check your next hint" title="Wrong answer!" color="danger"/>
    </div>
  );
}