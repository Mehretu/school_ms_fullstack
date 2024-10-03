import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { assignmentsData, examsData, lessonsData, resultsData, role} from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Prisma, Subject, Teacher } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { Result } from "postcss"

type ResultList = Result & {exam:{
  subject:Subject
  teacher:Teacher
}} & {assignment:{
  subject:Subject
}}

const columns = [
  {
    header: "Subject Name", 
    accessor:"name",
  },
  {
    header: "Student", 
    accessor:"student",


  },
  {
    header: "Score", 
    accessor:"score",


  },
 
  {
    header:"Teacher",
    accessor:"teacher",
    className:"hidden md:table-cell",

  },
  {
    header: "Class", 
    accessor:"class",
    className:"hidden md:table-cell",



  },
  {
    header:"Date",
    accessor:"date",
    className:"hidden md:table-cell",

  },
  {
    header: "Actions", 
    accessor:"action", 
  }
]

const renderRow = (item:Result) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
    <td className="flex items-center gap-4 p-4">{item.subject}</td>
    <td>{item.student}</td>
    <td >{item.score}</td>
    <td className="hidden md:table-cell">{item.teacher}</td>
    <td className="hidden md:table-cell">{item.class}</td>
    <td className="hidden md:table-cell">{item.date}</td>



    <td>
      <div className="flex items-center gap-2">
        <FormModal table="result" type="update" data={item}/>
        {role === "admin" && (
         <FormModal table="result" type="delete" id={item.id}/>
        )
          
        }
      </div>
    </td>

  </tr>

);
const ResultList = async ({
  searchParams
}:{
  searchParams:{[key:string]:string | undefined};
}) => {

  const {page,...queryParams} = searchParams

  const p = page ? parseInt(page) : 1;
  // URL PARAMS CONDITIONS
  const query: Prisma.ResultWhereInput = {}
  if(queryParams){
    for(const [key,value] of Object.entries(queryParams)){
      if(value !== undefined)
      switch(key){
        case "classId":
            query.lesson = {
              classId: parseInt(value)
            }
            break;
        case "teacherId":
          query.lesson ={
            teacherId: value,
          }
          break;
        case "search":
          query.lesson = {
            subject:{
              name:{contains:value, mode:"insensitive"}
            }
          }
          break;
        default:
          break;
          
          
      }
    }
  }
  const [data,count] = await prisma.$transaction([
     prisma.result.findMany({
      where:query,
      include:{
        exam:{
          select:{
            lesson:{
              select:{
                subject:{
                  select:{
                    name:true
                  }
              },
                teacher:{
                  select:{
                    name:true
                  }
                }
            }
            },
          }
        },
        assignment:{
          select:{
            lesson:{
              select:{
                subject:{
                  select:{
                    name:true
                  }
                },
                teacher:{
                  select:{
                    name:true
                  }
                }
              }
            }
          }
        },
        student:{
          select:{
            name:true
          }
        }
      },
      take:ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p-1),
    }),
     prisma.exam.count({where:query})
  ])

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch/>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14}/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14}/>
            </button>
            {role ==="admin" && (
              <FormModal table="result" type="create"/>
          )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={resultsData}/>
      {/* Pagination */}
        <Pagination/>

    </div>
  )
}

export default ResultList