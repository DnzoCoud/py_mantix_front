import { Skeleton } from 'primereact/skeleton'
import React from 'react'

function UserSkeleton() {
  return (
    <>
    <div className="border p-4 w-[20rem] h-auto rounded-sm">
        <div className="flex mb-3">
            <Skeleton shape="circle" size="4rem" className="mr-2" />
            <div>
                <Skeleton width="10rem" className="mb-2" />
                <Skeleton width="5rem" className="mb-2" />
                <Skeleton height=".5rem" />
            </div>
        </div>
        <Skeleton width="100%" height="150px" />
        <div className="flex justify-between mt-3">
            <Skeleton width="4rem" height="2rem" />
            <Skeleton width="4rem" height="2rem" />
        </div>
    </div>
    </>
  )
}

export default UserSkeleton