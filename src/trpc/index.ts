import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { z } from 'zod';
import { UTApi } from  "uploadthing/server"

const utapi = new UTApi();

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user.id || !user.email) throw new TRPCError({ code: 'UNAUTHORIZED' })

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id
      }
    })

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          username: user.id,
          youtubeLink: "",
          instagramLink: "",
          linkedLink: "",
          snapchatLink: "",
          tiktokLink: "",
          facebookLink: ""
        },
      })
    }
    return { success: true }
  }),
  getUserByUsername: publicProcedure.input(z.object({query: z.string()})).query(async (opts) => {
    
    const { input } = opts

    const user = await db.user.findFirst({
      where: {
        username: input.query
      },
    })
    
    if (!user )  throw new TRPCError({ code: 'NOT_FOUND' })

    return user
    
  }),
  getUserInfo: privateProcedure.query(async ({ctx}) => {

    const {userId, user} = ctx
    if (!user.id) throw new TRPCError({code: "UNAUTHORIZED"})

    const userData = await db.user.findFirst({
      where: {
        id: userId,
      }
    })
    if (!userData) throw new TRPCError({code: "UNAUTHORIZED"})
    
    return userData
  }),
  getUserLinks: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx
     
    const links = await db.link.findMany({
      where: {
        userId
      },
      include: {
        Visitors: true
      }
    })

    if (!links || links.length === 0) throw new TRPCError({code: "NOT_FOUND"})

    
    return links
  }),
  getUserAnalitycs: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx
     
    const analytics = await db.visitors.findMany({
      where: {
        userId: userId,
        linkType: "LINK"
      },

    })
    
    if (!analytics || analytics.length === 0) throw new TRPCError({code: "NOT_FOUND"})
    
    return analytics
  }),
  getLinkById: publicProcedure.input(z.object({user: z.string()})).query(async (opts) => {
    
    const { input } = opts

    const link = await db.link.findMany({
      where: {
        userId: input.user,
      },
    })
    
    if (!link || link.length === 0)  throw new TRPCError({ code: 'NOT_FOUND' })

    return link
    
  }),
  deleteLink: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const { userId } = ctx

    const link = await db.link.findFirst({
      where: {
        id: input.id,
        userId,
      },
    })

    if (!link) throw new TRPCError({ code: 'NOT_FOUND' })

    await db.visitors.deleteMany({
      where: {
        linkId: input.id,
      },
    })

    await db.link.delete({
      where: {
        id: input.id,
      },
    })
    

    return {success: true}
  }),
  addNewLink: privateProcedure.input(z.object({linkTitle: z.string() ,linkUrl: z.string(),linkUrlApp: z.string()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx

    // create user in db
    await db.link.create({
      data: {
        linkTitle: input.linkTitle,
        linkUrl: input.linkUrl,
        linkUrlApp: input.linkUrlApp,
        userId: userId,
      },
    })
  

  return { success: true }
  }),
  addNewVisit: publicProcedure.input(z.object({ linkType: z.string() ,linkId: z.string(),userId: z.string().nullable(),})).mutation(async ({input}) => {
    async function getData() {
      const res = await fetch('https://ipinfo.io/json')
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
     
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      return res.json()
    }
    const data = await getData()
    
    await db.visitors.create({
      data: {
        linkType: input.linkType,
        linkId: input.linkId,
        ip: data.ip,
        country: data.country,
        city: data.city,
        region: data.region,
        location: data.loc,
        userId: input.userId,
      }
    })

return { success: true }
}),
  editProfile: privateProcedure.input(z.object({username: z.string(),avatar: z.string(), youtube: z.string(), facebook: z.string(), instagram: z.string(), linked: z.string(), snapchat: z.string(), tiktok: z.string(), userPhone: z.string()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx
    if (!userId) throw new TRPCError({code: "UNAUTHORIZED"})
    // edit user in db
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        username: input.username,
        avatar: input.avatar,
        youtubeLink: input.youtube,
        instagramLink: input.instagram,
        facebookLink: input.facebook,
        linkedLink: input.linked,
        snapchatLink: input.snapchat,
        tiktokLink: input.tiktok,
        userPhone: input.userPhone,
      },
      
    })
  

  return { success: true }
  }),
  addNewCat: privateProcedure.input(z.object({catTitle: z.string() ,catParent: z.string(),catDesc: z.string()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx

    // create user in db
    await db.category.create({
      data: {
        catTitle: input.catTitle,
        catPar: input.catParent,
        catDesc: input.catDesc,
        catOpt: "",
      },
    })
  
  return { success: true }
  }),
  deleteCat: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({  input }) => {
    if (!input) throw new TRPCError({code: "NOT_FOUND"})

    return await db.category.delete({
        where: {
          id: input.id,
        },
    }).then(async () => {
      await db.category.deleteMany({
        where: {
          catPar: input.id,
        },
      })
    })
    
  }),
  getAllCats: publicProcedure.query(async () => {   
     
    const cats = await db.category.findMany()
    
    return cats
  }),
  addNewProduct: privateProcedure.input(z.object({productTitle: z.string(),productDesc: z.string(),productVar: z.string(),productCatId: z.string(),productImg: z.array(z.string()),productPrice: z.string(),productCommision: z.number(), productSrc: z.string()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx

    // create user in db
    await db.products.create({
      data: {
        productTitle: input.productTitle,
        productDesc: input.productDesc,
        productVar: input.productVar,
        productCatId: input.productCatId,
        productImg: input.productImg,
        productCatAdd: "",
        productState: false,
        productPrice: input.productPrice,
        productCommision: input.productCommision,
        productSrc: input.productSrc,
        author: userId

      },
    })
  

    return { success: true }
  }),
  getProductsByTitle: publicProcedure.input(z.object({query: z.string()})).query(async (opts) => {
    
    const { input } = opts

    const link = await db.products.findMany({
      where: {
        productTitle: {
          contains: input.query
        },
      },
      
    })
    
    if (!link || link.length === 0)  throw new TRPCError({ code: 'NOT_FOUND' })

    return link
    
  }),
  deleteProduct: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({  input }) => {

    if (!input) throw new TRPCError({code: "NOT_FOUND"})

    await db.userProducts.deleteMany({
      where: {
        productId: input.id,
      },
    })
    await db.orders.deleteMany({
      where: {
        productId: input.id,
      },
    })
    await db.transactions.deleteMany({
      where: {
        productId: input.id,
      },
    })

    const getProductFiles = await db.products.findFirst({
      where: {
        id: input.id,
      },
      select: {
        productSrc: true,
        productImg: true
      }
    })
    if (getProductFiles && getProductFiles.productSrc) {
      const getFilekey = getProductFiles.productSrc.replaceAll("https://uploadthing-prod.s3.us-west-2.amazonaws.com/", "")
      const deleteItem = await utapi.deleteFiles(getFilekey)
    }
    if (getProductFiles && getProductFiles.productImg) {
      getProductFiles.productImg.map(async (item) => {
        const getFilekey = item.replaceAll("https://uploadthing-prod.s3.us-west-2.amazonaws.com/", "")
        const deleteItem = await utapi.deleteFiles(getFilekey)
      })
      
    }

    return await db.products.delete({
        where: {
          id: input.id,
        },
    })
    
  }),
  getAllShowenProduct: publicProcedure.query(async () => {   
     
    const product = await db.category.findMany({
      include: {
        Product: {
          where: {
            productState: false,
          },
          include: {
            orders: true
          },
        },
      },
    })
    
    return product
  }),
  getUserProducts: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx
     
    const userProducts = await db.userProducts.findMany({
      where: {
        userId
      }
    })

    return userProducts
  }),
  addNewUserProduct: privateProcedure.input(z.object({productId: z.string()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx

    // create user in db
    await db.userProducts.create({
      data: {
        productId: input.productId,
        userId: userId,
      },
    })
  

  return { success: true }
  }),
  getUserChoosenProducts: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx

    const userProduct = await db.userProducts.findMany({
      where: {
        userId
      }
    }).then(async (res) => {
      if (!res) throw new TRPCError({code: "NOT_FOUND"})

      let ids: string[] = res.map(get => {
        if (get.productId) {
          return get.productId
        } else {
          return ""
        }
        
      }) 
      if (!ids) throw new TRPCError({code: "NOT_FOUND"})
      return await db.products.findMany({
        where: {
          id: {in: ids}
        },
        include: {
          orders: {
            where: {
              userId
            }
          }
        }
      })

    })

    return userProduct
  }),
  deleteUserProduct: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const { userId } = ctx

    return await db.userProducts.deleteMany({
      where: {
        productId: input.id,
        userId: userId
      },
    })
  }),
  getProductsById: publicProcedure.input(z.object({query: z.string()})).query(async (opts) => {
    
    const { input } = opts

    const product = await db.products.findFirst({
      where: {
        id: input.query
      },
      include: {
        Category: true
      }
    })
    
    if (!product )  throw new TRPCError({ code: 'NOT_FOUND' })

    return product
    
  }),
  addOrder: publicProcedure.input(z.object({productId: z.string(),userId: z.string(),clientName: z.string(), clientPhone: z.string(),clientAdresse: z.string(),productVar: z.string()})).mutation(async (opts) => {
    
    const { input } = opts

    await db.orders.create({
      data: {
        clientName: input.clientName,
        clientAdresse: input.clientAdresse,
        clientPhone: input.clientPhone,
        orderState: "PROSSECING",
        productVar: input.productVar,
        productId: input.productId,
        userId: input.userId,

      },
    })
  

    return { success: true }
    
  }),
  getUserProductById: publicProcedure.input(z.object({query: z.string()})).query(async (opts) => {
    
    const { input } = opts

    const userProduct = await db.userProducts.findMany({
      where: {
        userId: input.query
      }
    }).then(async (res) => {
      if (!res) throw new TRPCError({code: "NOT_FOUND"})

      let ids: string[] = res.map(get => {
        if (get.productId) {
          return get.productId
        } else {
          return ""
        }
        
      }) 
      if (!ids) throw new TRPCError({code: "NOT_FOUND"})
      return await db.products.findMany({
        where: {
          id: {in: ids}
        }
      })

    })

    return userProduct
    
  }),
  getUserOrders: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx
     
    const userOrders = await db.orders.findMany({
      where: {
        userId,
        orderState: "COMFIRMED"
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        Products: true
      }
    })

    return userOrders
  }),
  getAllOrders: publicProcedure.input(z.object({query: z.string()})).query(async (opts) => {
    
    const { input } = opts

    const orders = await db.orders.findMany({
      where: {
        id: {
          contains: input.query
        },
      },
      include : {
        Products: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    
    if (!orders || orders.length === 0)  throw new TRPCError({ code: 'NOT_FOUND' })

    return orders
    
  }),
  editOrderState: privateProcedure.input(z.object({orderId: z.string(),newState: z.enum(["PROSSECING","PENDING","COMFIRMED","CANCELED"])})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx
    if (!userId) throw new TRPCError({code: "UNAUTHORIZED"})
    // edit user in db
    
    await db.orders.update({
      where: {
        id: input.orderId,
      },
      data: {
        orderState: input.newState
      },
      
    })
  

  return { success: true }
  }),
  addBalance: privateProcedure.input(z.object({userId: z.string(),addValue: z.number(), productId: z.string()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx
    if (!userId) throw new TRPCError({code: "UNAUTHORIZED"})

    const getAUthor = await db.products.findFirst({
      where: {
        id: input.productId
      },
    })

    if (getAUthor && getAUthor.author) {
      await db.transactions.create({
        data: {
          transactionType: "BENEFIT",
          transactionValue: getAUthor.productAuthCommision,
          userId: getAUthor.author,
          productId: input.productId
        }
      })
      await db.user.update({
        where: {
          id: getAUthor.author,
        },
        data: {
          userBalance: {
            increment: getAUthor.productAuthCommision
          }
        },
      })

    }

      await db.transactions.create({
        data: {
          transactionType: "BENEFIT",
          transactionValue: input.addValue,
          userId: input.userId,
          productId: input.productId
        }
      })
      const editBalance = await db.user.update({
        where: {
          id: input.userId,
        },
        data: {
          userBalance: {
            increment: input.addValue
          }
        },
      })
      
      if (!editBalance) throw new TRPCError({code: "BAD_REQUEST"})
  return editBalance
  }),
  demandePay: privateProcedure.input(z.object({userId: z.string(),value: z.number()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx
    if (!userId) throw new TRPCError({code: "UNAUTHORIZED"})

    await db.transactions.findFirst({
      where: {
        transactionType: "DEMANDE",
        AND: {
          userId: input.userId
        },
      }
    }).then((res) => {
      if (res) throw new TRPCError({code: "UNAUTHORIZED"})
    })
    
    const demandePay = await db.transactions.create({
        data: {
          transactionType: "DEMANDE",
          transactionValue: input.value,
          userId: input.userId,
          productId: ""
        }
      })
      
      if (!demandePay) throw new TRPCError({code: "BAD_REQUEST"})
  return demandePay
  }),
  getUserPayHistory: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx
     
    const userOrders = await db.transactions.findMany({
      where: {
        userId,
        OR: [{
          transactionType: "DEMANDE",
        },
        {
          transactionType: "COMFIRMED"
        },
        {
          transactionType: "CANCELED",
        },
      ]
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return userOrders
  }),
  getAllDemandes: publicProcedure.input(z.object({query: z.string()})).query(async (opts) => {
    
    const { input } = opts

    const orders = await db.transactions.findMany({
      where: {
        id: {
          contains: input.query,
        },
        OR: [{
          transactionType: "DEMANDE",
        },
        {
          transactionType: "COMFIRMED",
        },
        {
          transactionType: "CANCELED",
        },
      ]
      },
      include : {
        User: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    
    if (!orders || orders.length === 0)  throw new TRPCError({ code: 'NOT_FOUND' })

    return orders
    
  }),
  editBalance: privateProcedure.input(z.object({userId: z.string(),value: z.number(), transactionId: z.string()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx
    if (!userId) throw new TRPCError({code: "UNAUTHORIZED"})

    const getUserBalance = await db.user.findFirst({
      select: {
        userBalance: true
      },
      where: {
        id: input.userId
      }
    })

    if (!getUserBalance || getUserBalance.userBalance < input.value) throw new TRPCError({code: "FORBIDDEN"})

      await db.transactions.update({
        where: {
          id: input.transactionId
        },
        data: {
          transactionType: "COMFIRMED",
        }
      })
      

      const editBalance = await db.user.update({
        where: {
          id: input.userId,
        },
        data: {
          userBalance: {
            decrement: input.value
          }
        },
        
      })
      if (!editBalance) throw new TRPCError({code: "BAD_REQUEST"})
  return editBalance
  }),
  editDemande: privateProcedure.input(z.object({newValue: z.string(), transactionId: z.string()})).mutation(async ({ ctx, input }) => {
    
    const { userId } = ctx
    if (!userId) throw new TRPCError({code: "UNAUTHORIZED"})

      const editTrans = await db.transactions.update({
        where: {
          id: input.transactionId
        },
        data: {
          transactionType: input.newValue,
        }
      })
      
  return editTrans
  }),
  getUserBenefits: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx
     
    const userBenefits = await db.transactions.findMany({
      where: {
        userId,
        transactionType: "BENEFIT",
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return userBenefits
  }),
  addNewTheme: privateProcedure.input(z.object({themeType: z.string(),themeBgLink: z.string(),themeBgColor: z.string(),themeNumber: z.number()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx

    // create user in db
    await db.themes.create({
      data: {
        themeType: input.themeType,
        themeBgIlmg: input.themeBgLink,
        themeBg: input.themeBgColor,
        themeNum: input.themeNumber,

      },
    })
  

    return { success: true }
  }),
  getThemeData: publicProcedure.input(z.object({themeNum: z.number()})).query(async (opts) => {   
     
    const themeData = await db.themes.findFirst({
      where: {
        themeNum: opts.input.themeNum
      }
    })
    
    return themeData
  }),
  editProduct: privateProcedure.input(z.object({productId: z.string(),productTitle: z.string(),productDesc: z.string(),productVar: z.string(),productImg: z.array(z.string()),productState: z.boolean(),productPrice: z.string(),productCommision: z.number(),})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx

    // create user in db
    await db.products.update({
      where: {
        id: input.productId
      },
      data: {
        productTitle: input.productTitle,
        productDesc: input.productDesc,
        productVar: input.productVar,
        productImg: input.productImg,
        productState: input.productState,
        productPrice: input.productPrice,
        productCommision: input.productCommision,

      },
    })
  

    return { success: true }
  }),
  deletePhoto: privateProcedure.input(z.object({imgName: z.string()})).mutation(async ({ ctx, input }) => {

    const getFilekey = input.imgName.replaceAll("https://uploadthing-prod.s3.us-west-2.amazonaws.com/", "")
    const deleteItem = await utapi.deleteFiles(getFilekey)
    
    return deleteItem.success
  }),
  getAllOthersMem: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx

    const getAllOthers = await db.user.findMany({
      select: {
        username: true,
      },
      where: {
        id: {
          not: userId,
        }
      }
    })

    return getAllOthers
  }),
  getAllMem: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx

    const getAllOthers = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    return getAllOthers
  }),
  deleteMem: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({  input }) => {
    if (!input) throw new TRPCError({code: "NOT_FOUND"})
    const userId = input.id

    await db.link.deleteMany({
        where: {
          userId: input.id,
        },
    })
    await db.visitors.deleteMany({
        where: {
          userId: input.id,
        },
    })
    await db.userProducts.deleteMany({
        where: {
          userId: input.id,
        },
    })
    await db.orders.deleteMany({
        where: {
          userId: input.id,
        },
    })
    await db.transactions.deleteMany({
        where: {
          userId: input.id,
        },
      })
    await db.user.delete({
        where: {
          id: userId,
        },
               
    })
    
  }),
  getDesignerOrders: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx
     
    const designerOrders = await db.transactions.findMany({
      where: {
        transactionType: "BENEFIT",
        userId,
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        Products: true,
      }
    })

    return designerOrders
  }),
  editUserState: privateProcedure.input(z.object({userId: z.string(),newValue: z.string()})).mutation(async ({ ctx, input }) => {
    const { userId } = ctx
    if (!userId) throw new TRPCError({code: "UNAUTHORIZED"})

    const edituserState = await db.user.update({
        where: {
          id: input.userId
        },
        data: {
          userState: input.newValue,
        }
      })

  return edituserState
  }),

  getDesignerProduct: privateProcedure.query(async ({ctx}) => {   
    const {userId, user} = ctx
     
    const designerProducts = await db.products.findMany({
      where: {
        author: userId,
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        transactions: {
          where: {
            transactionType: "BENEFIT",
          }
        }
      }
    })

    return designerProducts
  }),
 

});


export type AppRouter = typeof appRouter;