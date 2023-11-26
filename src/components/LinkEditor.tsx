"use client"

import { trpc } from '@/app/_trpc/Client';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { string, z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';

const LinkEditor = () => {

        
    const appsLinks  = [
        {before: "https://www.web.facebook.com/" , after: "fb://",},
        {before: "https://web.facebook.com/" , after: "fb://",},
        {before: "https://www.facebook.com/" , after: "fb://",},
        {before: "https://facebook.com/" , after: "fb://",},
        {before: "http://www.facebook.com/" , after: "fb://",},
        {before: "http://web.facebook.com/" , after: "fb://",},
        {before: "http://facebook.com/" , after: "fb://",},
        {before: "m.facebook.com/" , after: "fb://",},

        {before: "https://www.youtube.com/" , after: "vnd.youtube:",},
        {before: "https://youtube.com/" , after: "vnd.youtube:",},
        {before: "http://www.youtube.com/" , after: "vnd.youtube:",},
        {before: "http://youtube.com/" , after: "vnd.youtube:",},

        {before: "https://www.instagram.com/" , after: "instagram://user?username=",},
        {before: "https://instagram.com/" , after: "instagram://user?username=",},
        {before: "http://www.instagram.com/" , after: "instagram://user?username=",},
        {before: "http://instagram.com/" , after: "instagram://user?username=",},

        
    ]    
        
        


      
    const {mutate: addLink} = trpc.addNewLink.useMutation({
      onSuccess: () => {
        //done
        window.location.reload();
      },
      
    })
  
    const formSchema = z.object({
      linkTitle: z.string().min(2, {
        message: "please enter a title",
      }),
      linkUrl: z.string(),
      linkUrlApp: z.string(),
      
    })
    
       // 1. Define your form.
       const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          linkTitle: "",
          linkUrl: "",
          linkUrlApp: "",
          
        },
    })
     
    
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {

        let getUrl = form.getValues("linkUrl")
        //replace text in url
        appsLinks.map((item) => (

            getUrl = getUrl.replaceAll(item.before, item.after)           
            
        ))
        if (getUrl.charAt(getUrl.length -1) == "/" ) {
          getUrl = getUrl.slice(0, -1)
        }

        addLink({linkTitle: form.getValues("linkTitle"), linkUrl: form.getValues("linkUrl"), linkUrlApp: getUrl})
        
      }
      
    
    return (
      <>
      <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="linkTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title of your link</FormLabel>
                <FormControl>
                  <Input placeholder="Follow me on Youtube" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="Put your link here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                            
          <Button type="submit">
                Submit
            </Button>
        </form>
      </Form>
      </div>
      </>
    )
  }


export default LinkEditor