"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
    subject: 
    z.string()
    .min(3, { message: 'Subject must be at least 3 characters long!' }),
    student: z.string().min(1,{message: 'Student is required!'}),
    score: z.string().min(1,{message: 'Score is required!'}),
    teacher: z.string().min(1,{message: 'Teacher is required!'}),
    class: z.string().min(1,{message: 'Class is required!'}),
    date: z.date({message:"Date is required"})

  });

  type Inputs = z.infer<typeof schema>;

const ResultForm = ({
    type,
    data
}:{
    type:"create" | "update"; 
    data?:any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({
        resolver: zodResolver(schema),
      });
      const onSubmit = handleSubmit((data) =>{
        console.log(data);

      });
  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">Create a new result</h1>
        <span className="text-xs text-gray-400 font-medium">
          Authentication Information
          </span>
        <div className="flex justify-between flex-wrap gap-4">
        <InputField 
          label="Subject Name" 
          name="subject" 
          defaultValue={data?.subject} 
          register={register} 
          error={errors.subject}
        />
        <InputField 
          label="Student" 
          name="student" 
          defaultValue={data?.student} 
          register={register} 
          error={errors.student}
        />
        <InputField 
          label="Score" 
          name="score" 
          defaultValue={data?.score} 
          register={register} 
          error={errors.score}
        />
        <InputField 
          label="Teacher" 
          name="teacher"
          defaultValue={data?.teacher} 
          register={register} 
          error={errors.teacher}
        />
        <InputField 
          label="Class" 
          name="class"
          defaultValue={data?.class} 
          register={register} 
          error={errors.class}
        />
        <InputField 
          label="Date" 
          name="date"
          type="date"
          defaultValue={data?.date} 
          register={register} 
          error={errors.date}
        />

        </div>
        

        {/* <span 
            className="text-xs text-gray-400 font-medium">
            Personal Information
        </span> */}
        {/* <div className="flex justify-between flex-wrap gap-4">
        <InputField 
          label="First Name" 
          name="firstName" 
          defaultValue={data?.firstName} 
          register={register} 
          error={errors.firstName}
        />
        <InputField 
          label="Last Name" 
          name="lastName"
          defaultValue={data?.lastName} 
          register={register} 
          error={errors.lastName}
        />
        <InputField 
          label="Phone" 
          name="phone"
          defaultValue={data?.phone} 
          register={register} 
          error={errors.phone}
        />
        <InputField 
          label="Address" 
          name="address"
          defaultValue={data?.address} 
          register={register} 
          error={errors.address}
        />
        <InputField 
          label="Blood Type" 
          name="bloodType"
          defaultValue={data?.bloodType} 
          register={register} 
          error={errors.bloodType}
        />
        <InputField 
          label="Birthday" 
          name="birthday"
          defaultValue={data?.birthday} 
          register={register} 
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Sex</label>
          <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("sex")} defaultValue={data?.sex}>
          <option value="male">Male</option>
          <option value="female">Female</option>

          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
            {errors.sex.message.toString()}
          </p>
          )}

        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
        <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
          <Image src="/upload.png" alt="" width={28} height={28}/>
          <span>Upload a photo</span>
        </label>
          <input type="file" id="img" {...register("img")} className="hidden"/>
          {errors.img?.message && (
            <p className="text-xs text-red-400">
            {errors.img.message.toString()}
          </p>
          )}

        </div>
        </div> */}

        <button className="bg-blue-400 text-white p-2 rounded-md">
            {type=== "create" ? "Create" : "Update"}
        </button>


    </form>
  )
}

export default ResultForm
