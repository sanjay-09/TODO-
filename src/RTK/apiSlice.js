import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3000",
        prepareHeaders:(headers)=>{
            if(window.localStorage.getItem("token")){
                header.set("authorization",`Bearer ${window.localStorage.getItem("token")}`)
            }
        }
    }),
    tagTypes:["Tasks"],
    endpoints:(builder)=>({
        getTasks:builder.query({
            query:()=>"/tasks",
            transformResponse: (tasks) => tasks.reverse(),
          providesTags:["Tasks"]
        }),
        addTasks:builder.mutation({
            query:(payload)=>({
                url:"/tasks",
              method:"POST",
              body:payload


            }),
            invalidatesTags:["Tasks"],
            async onQueryStarted(payload,{dispatch,queryFulfilled}){
                const patchResult=dispatch(
                    apiSlice.util.updateQueryData("getTasks",undefined,(draft)=>{
                        draft.unshift({id:crypto.randomUUID(),...payload});
            }));
                try{
                    await queryFulfilled;
                }
                catch{
                    patchResult.undo();
                }
            },
        }),
        updateTasks:builder.mutation({
            query:(payload)=>({
                url:`/tasks/${payload.id}`,
                method:"PATCH",
                body:payload.body

            }),
            invalidatesTags:["Tasks"],
            async onQueryStarted(payload,{dispatch,queryFulfilled}){
                const patchResult=dispatch(
                    apiSlice.util.updateQueryData("getTasks",undefined,(draft)=>{
                        const TaskIndex=draft.findIndex((e)=>{
                            return e.id===payload.id
                        });
                        draft[TaskIndex]={...draft[TaskIndex],...payload};
                    })
                  
                );
                try{
                    await queryFulfilled;
                }
                catch{
                    patchResult.undo();
                }


            }
        }),
        deleteTasks:builder.mutation({
            query:(id)=>({
                url:`/tasks/${id}`,
                method:"DELETE"


            }),
            invalidatesTags:["Tasks"],
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                const patchResult=dispatch(
                    apiSlice.util.updateQueryData("getTasks",undefined,(draft)=>{
                       draft.splice(id,1);
                    })

                )
            }

        })
    })
})
export const{useGetTasksQuery,useAddTasksMutation,useUpdateTasksMutation,useDeleteTasksMutation}=apiSlice;