

import { buttonVariants } from "./ui/button"
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog"
import { useState } from "react"
import { cn } from "@/lib/utils"

import LinkEditor from "./LinkEditor"





const UploadButton =() => {

    const [isOpen,setIsOpen] = useState<boolean>()


    return (
        <Dialog open={isOpen} onOpenChange={(v) => {
            if(!v) {
                setIsOpen(v)
            }
        }}>
        <DialogTrigger onClick={() => setIsOpen(true)} asChild>
            <div className={cn(buttonVariants({size: "lg"}), "bg-blue-600 text-lg py-4 cursor-pointer")}>
                Add new link
            </div>
        </DialogTrigger>
        <DialogContent>
            <LinkEditor />
        </DialogContent>
        </Dialog>
    )
}
export default UploadButton