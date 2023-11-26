import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();
 
 

export const ourFileRouter = {
  avatarUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession()
      const user = getUser()

      if(!user || !user.id) throw new Error("unauthorized")

      return {userId: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      
      const updateAvatar = await db.user.update({
        where: {
          id: metadata.userId,
        },
        data: {
          avatar: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
        }
      })
    }),
    productImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession()
      const user = getUser()

      if(!user || !user.id) throw new Error("unauthorized")

      return {userId: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;