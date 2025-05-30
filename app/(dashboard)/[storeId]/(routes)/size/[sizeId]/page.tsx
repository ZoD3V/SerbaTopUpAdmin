import prismadb from '@/lib/prismadb'
import React from 'react'
import SizeForm from '../components/size-form'

const AddSizePage = async({params}:{params:{sizeId:string}}) => {
  const size = await prismadb.size.findUnique({
    where:{
      id:params.sizeId
    }
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-8 pt-6">
        <SizeForm initialData={size}/>
      </div>
    </div>
  )
}

export default AddSizePage